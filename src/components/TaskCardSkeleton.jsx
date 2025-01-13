import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function TaskCardSkeleton() {
  return (
    <div className="py-4 px-4 rounded-[10px] bg-zinc-300 dark:bg-zinc-600">
      <div className="flex flex-col">
        <h2><Skeleton width={150} /></h2>
        <p><Skeleton count={2} /></p>
        
        <div className="flex gap-3 mt-2">
          <span className='font-medium'>
            <Skeleton width={200} />
          </span>
          <span><Skeleton width={20} /></span>
        </div>
      </div>
      <div className="flex gap-2 pt-3 h-15">
        <Skeleton width={80} height={40} />
        <Skeleton width={80} height={40} />
        <Skeleton width={100} height={40} />
      </div>
    </div>
  );
}

