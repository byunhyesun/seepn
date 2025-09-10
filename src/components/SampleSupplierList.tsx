import React from "react";
import { Samplesupplier } from "../data/samplesuppliers";
import {
  Grid3X3,
  List,
  MapPin,
  Star,
  Filter,
  X,
  Heart,
  ExternalLink,
  ThumbsUp,
  ChevronDown,
  ChevronLeft,
} from "lucide-react";
interface SampleSupplierListProps {
  samplesuppliers: Samplesupplier[];
}
const getLikesCount = (supplier: { id: number }) => (supplier.id % 100) + 10;
const getFavoritesCount = (supplier: { id: number }) => (supplier.id % 50) + 5;

export const SampleSupplierList: React.FC<SampleSupplierListProps> = ({
  samplesuppliers,
}) => {
  const allSuppliers = React.useMemo(() => {
    const expanded: typeof samplesuppliers = [] as any;
    const repeat = 60; // 6 * 60 = 360 items total
    for (let r = 0; r < repeat; r++) {
      for (const s of samplesuppliers) {
        expanded.push({
          ...s,
          id: r * 1000 + s.id,
          name: `${s.name} ${r + 1}`,
        });
      }
    }
    return expanded;
  }, [samplesuppliers]);
  return (
    <>
      {samplesuppliers.map((samplesupplier) => (
        <div
          key={samplesupplier.id}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="text-4xl mb-2">🏢</div>
              <div className="text-sm">Company Image</div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 flex-1">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {samplesupplier.name}
                </h3>
                {samplesupplier.website && (
                  <a
                    href={samplesupplier.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="홈페이지 방문"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                {samplesupplier.categoryDepth3}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                {samplesupplier.location}
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {samplesupplier.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {samplesupplier.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Stats above detail button: rating, favorites, likes */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1 text-yellow-600">
                <Star className="h-4 w-4 fill-current" />
                <span>{samplesupplier.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 text-red-500" />
                <span>{getFavoritesCount(samplesupplier)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4 text-blue-500" />
                <span>{getLikesCount(samplesupplier)}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
              {/* {getText("viewDetail")} */}
              상세보기
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
