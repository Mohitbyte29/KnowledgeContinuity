import KnowledgeEntry from "../models/KnowledgeEntry.js";
import GraphEdge from "../models/GraphEdge.js";

/**
 * Called right after a new KnowledgeEntry is saved. Finds other approved
 * entries it relates to (shared tags > shared project > shared author,
 * in that priority order) and upserts edges both directions so a lookup
 * from either entry's side works without a second query.
 *
 * Deliberately incremental, not a full graph rebuild: only computes edges
 * for the ONE new entry against everything that already exists, so this
 * stays cheap even as the knowledge base grows. A full rebuild is never
 * needed because every entry gets its edges computed exactly once, at
 * the moment it's created.
 */
export async function updateGraphForEntry(entry) {
  if (!entry?._id) return;

  const hasTags = Array.isArray(entry.tags) && entry.tags.length > 0;
  const hasProject = Boolean(entry.project);
  const hasAuthor = Boolean(entry.author);

  if (!hasTags && !hasProject && !hasAuthor) return;

  // Find candidate entries that could relate on any axis — narrowed with
  // $or so this stays a single indexed query instead of three separate ones.
  const candidates = await KnowledgeEntry.find({
    _id: { $ne: entry._id },
    status: "approved",
    $or: [
      ...(hasTags ? [{ tags: { $in: entry.tags } }] : []),
      ...(hasProject ? [{ project: entry.project }] : []),
      ...(hasAuthor ? [{ author: entry.author }] : []),
    ],
  })
    .select("_id tags project author")
    .lean();

  if (candidates.length === 0) return;

  const edgeOps = [];

  for (const candidate of candidates) {
    const sharedTags = hasTags
      ? entry.tags.filter((t) => candidate.tags?.includes(t))
      : [];
    const sameProject = hasProject && candidate.project === entry.project;
    const sameAuthor = hasAuthor && candidate.author === entry.author;

    // Priority order: a shared tag is the most meaningful signal (same
    // technical problem area), so it wins over merely being in the same
    // project or written by the same person.
    let relationType = null;
    let weight = 0;

    if (sharedTags.length > 0) {
      relationType = "shared_tag";
      weight = sharedTags.length;
    } else if (sameProject) {
      relationType = "shared_project";
      weight = 1;
    } else if (sameAuthor) {
      relationType = "shared_author";
      weight = 1;
    }

    if (!relationType) continue;

    edgeOps.push(buildUpsertOp(entry._id, candidate._id, relationType, sharedTags, weight));
    // Mirror the edge so it's a single query from either entry's side —
    // the graph is conceptually undirected even though it's stored as
    // two directed rows.
    edgeOps.push(buildUpsertOp(candidate._id, entry._id, relationType, sharedTags, weight));
  }

  if (edgeOps.length > 0) {
    await GraphEdge.bulkWrite(edgeOps);
  }
}

function buildUpsertOp(fromId, toId, relationType, sharedTags, weight) {
  return {
    updateOne: {
      filter: { fromEntry: fromId, toEntry: toId },
      update: {
        $set: { relationType, sharedTags, weight },
        $setOnInsert: { fromEntry: fromId, toEntry: toId },
      },
      upsert: true,
    },
  };
}

/**
 * Reads the graph from one entry's perspective — "what does this entry
 * connect to, ranked by strength." Used for a future "related knowledge"
 * panel or the manager dashboard's expertise map.
 */
export async function getRelatedEntries(entryId, limit = 8) {
  const edges = await GraphEdge.find({ fromEntry: entryId })
    .sort({ weight: -1 })
    .limit(limit)
    .populate("toEntry", "problem project author tags")
    .lean();

  return edges
    .filter((e) => e.toEntry) // guard against a populate miss if the target was since deleted
    .map((e) => ({
      entryId: e.toEntry._id,
      problem: e.toEntry.problem,
      project: e.toEntry.project,
      author: e.toEntry.author,
      relationType: e.relationType,
      sharedTags: e.sharedTags,
      weight: e.weight,
    }));
}