
import {Link} from "react-router-dom";
import {lazy, Suspense, ReactNode} from "react";
const LazyImage = lazy(() => import("./LazyImage"));



interface MovieProps{
    id: number;
    title: string;
    poster: string;
    rating: number;
}

export default function MovieCard({id,title,poster,rating}:MovieProps) {
    return (
        <Suspense fallback={(<div className="spinner"></div> as ReactNode)}>
            <div className="bg-gray-900 text-white rounded-lg p-5" key={id}>
                <LazyImage src={poster} alt={title} className="w-full rounded"/>
                <h3 className="text-lg font-bold mt-2">
                    <Link to={('/movie/'+id)}>{title}</Link>
                    </h3>
                <p>⭐ {rating}</p>
            </div>
        </Suspense>

    )
}