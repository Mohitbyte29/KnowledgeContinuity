import mongoose from "mongoose";

const { Schema } = mongoose;

/**
 * An edge in the knowledge graph: "fromEntry relates to toEntry, because of X."
 * Stored as directed pairs (A->B and B->A both exist) so a lookup from either
 * entry's side is a single indexed query, no graph traversal library needed.
 */
const graphEdgeSchema = new Schema(
  {
    fromEntry: {
      type: Schema.Types.ObjectId,
      ref: "KnowledgeEntry",
      required: true,
    },
    toEntry: {
      type: Schema.Types.ObjectId,
      ref: "KnowledgeEntry",
      required: true,
    },
    relationType: {
      type: String,
      enum: ["shared_tag", "shared_project", "shared_author"],
      required: true,
    },
    // Only populated when relationType === "shared_tag"
    sharedTags: {
      type: [String],
      default: [],
    },
    // Rough "how strongly related" signal — shared tag count, or 1 for
    // project/author matches. Used to rank/limit results on read.
    weight: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

// One edge per (fromEntry, toEntry) pair — re-saving updates it instead of duplicating
graphEdgeSchema.index({ fromEntry: 1, toEntry: 1 }, { unique: true });
graphEdgeSchema.index({ fromEntry: 1, weight: -1 });

export default mongoose.model("GraphEdge", graphEdgeSchema);