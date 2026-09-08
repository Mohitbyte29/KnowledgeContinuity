import Loader from "../shared/Loader";

interface dummyData {
  sourceId: string;
  type: string;
  project: string;
  author: string;
  date: string;
  title: string;
  rawText: string;
  resolved: boolean;
}

const SourceData : dummyData[] = [
  {
    "sourceId": "TICKET-4522",
    "type": "ticket",
    "project": "auth-service",
    "author": "rahul.sharma",
    "date": "2026-03-05T10:25:00Z",
    "title": "JWT tokens expiring earlier than expected",
    "rawText": "Users were being logged out after 15 minutes instead of the configured 2 hours. Token expiry was incorrectly calculated using milliseconds instead of seconds.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4523",
    "type": "ticket",
    "project": "order-service",
    "author": "ananya.singh",
    "date": "2026-03-06T14:40:00Z",
    "title": "Duplicate orders created during payment retry",
    "rawText": "Customers occasionally received two orders after retrying a failed payment. Missing idempotency keys allowed the same checkout request to be processed multiple times.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4524",
    "type": "ticket",
    "project": "notification-service",
    "author": "vikas.mehta",
    "date": "2026-03-07T08:55:00Z",
    "title": "Email notifications delayed",
    "rawText": "Order confirmation emails were delayed by up to 30 minutes. The notification queue was overloaded because failed messages were being retried without exponential backoff.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4525",
    "type": "ticket",
    "project": "checkout-service",
    "author": "neha.kapoor",
    "date": "2026-03-08T16:20:00Z",
    "title": "Checkout requests timing out",
    "rawText": "Checkout requests were timing out during peak traffic. Database connection pooling was configured too low, causing requests to wait for available connections.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4526",
    "type": "ticket",
    "project": "inventory-service",
    "author": "arjun.verma",
    "date": "2026-03-09T11:15:00Z",
    "title": "Inventory count not updated after cancellation",
    "rawText": "Cancelled orders were not returning items to available inventory. The cancellation flow updated the order status but skipped the inventory restoration event.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4527",
    "type": "ticket",
    "project": "user-service",
    "author": "simran.kaur",
    "date": "2026-03-10T13:35:00Z",
    "title": "User profile updates returning stale data",
    "rawText": "Profile changes were saved successfully but the API continued returning old values. A Redis cache entry was not being invalidated after profile updates.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4528",
    "type": "ticket",
    "project": "search-service",
    "author": "rohan.gupta",
    "date": "2026-03-11T09:45:00Z",
    "title": "Search results missing recently added products",
    "rawText": "New products were not appearing in search results immediately after creation. The indexing worker was processing events with a significant delay.",
    "resolved": false
  },
  {
    "sourceId": "TICKET-4529",
    "type": "ticket",
    "project": "api-gateway",
    "author": "priya.raman",
    "date": "2026-03-12T17:10:00Z",
    "title": "Rate limiter blocking valid requests",
    "rawText": "Some users were receiving 429 responses despite staying below their configured request limit. Multiple gateway instances were not sharing rate-limit state correctly.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4530",
    "type": "ticket",
    "project": "shipping-service",
    "author": "amit.malhotra",
    "date": "2026-03-13T12:05:00Z",
    "title": "Shipping labels generated with incorrect address",
    "rawText": "A small number of shipping labels contained outdated customer addresses. The service was reading cached address data instead of the latest order snapshot.",
    "resolved": true
  },
  {
    "sourceId": "TICKET-4531",
    "type": "ticket",
    "project": "analytics-service",
    "author": "kavya.iyer",
    "date": "2026-03-14T15:30:00Z",
    "title": "Daily sales report showing incorrect totals",
    "rawText": "The daily sales dashboard was showing totals higher than the actual transaction volume. Refunded transactions were being counted as completed sales in the aggregation query.",
    "resolved": false
  }
]

interface SourceDataPanelProps {
  items?: dummyData[];
  loading: boolean;
}

const SourceDataPanel = ({ items = [], loading }: SourceDataPanelProps) => {
  if (loading) return <Loader />

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.sourceId} className="bg-white rounded-lg border p-4">
          <span className="text-[11px] uppercase font-semibold">
            {item.type === 'ticket' ? 'Ticket' : 'Slack thread'}
          </span>
          <span className="text-[12px] text-gray-500 float-right">
            {new Date(item.date).toLocaleDateString()}
          </span>
          <h3 className="font-semibold mt-2">{item.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.rawText}</p>
        </div>
      ))}
    </div>
  )
}

export default SourceDataPanel