import type { Recommendation } from "../src/index"

interface RecommendationProps {
  nostoRecommendation?: Recommendation
}

export default function RecommendationComponent({ nostoRecommendation }: RecommendationProps) {
  return (
    <div className="nosto-list" data-testid="recommendation">
      {nostoRecommendation?.products.map((product, i) => (
        <div key={i} data-testid="recommendation-product">
          <div data-testid="recommendation-product-name">{product.name}</div>
        </div>
      ))}
    </div>
  )
}
