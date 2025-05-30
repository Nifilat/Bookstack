export default function Rating({ score }: { score: number }) {
    return (
      <div className="absolute top-0 right-0 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md">
        <span className="font-medium text-sm">{Number(score).toFixed(1)}</span>
      </div>
    );
  }