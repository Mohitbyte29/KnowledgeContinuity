
import { WormLoader } from "../../components/ui/worm-loader";

export default function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center transition-colors">
      <div className="rounded-xl bg-white dark:bg-gray-800 border p-8">
        <WormLoader />
      </div>
    </div>
  ); 
}
