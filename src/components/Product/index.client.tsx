import { Product } from "../../types";
import { useNostoContext } from "../Provider/context.client";
import { useDeepCompareEffect } from "../../utils/hooks";

/**
 * The NostoProduct component must be used to personalise the product page.
 * The component requires that you provide it the identifier of the current product being viewed.
 *
 * By default, your account, when created, has three product-page placements named `productpage-nosto-1`, `productpage-nosto-2` and `productpage-nosto-3`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * The `<NostoProduct \>` component needs to be added after the placements.
 * Content and recommendations will be rendered through this component.
 * Pass in the product ID via the product prop to pass this information back to Nosto.
 *
 * @example
 * ```
 * <div className="product-page">
 *   <NostoPlacement id="productpage-nosto-1" />
 *   <NostoPlacement id="productpage-nosto-2" />
 *   <NostoPlacement id="productpage-nosto-3" />
 *   <NostoProduct product={product.id} />
 * </div>
 * ```
 *
 * @group Personalisation Components
 */
export default function NostoProduct(props: {
  product: string;
  tagging?: Product;
  placements?: string[];
}): JSX.Element {
  const { product, tagging } = props;
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("product");

  useDeepCompareEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setResponseMode(responseMode)
          .viewProduct(product)
          .setPlacements(props.placements || api.placements.getPlacements())
          .load()
          .then((data) => {
            renderCampaigns(data, api);
          });
      });
    }
  }, [
    clientScriptLoaded,
    currentVariation,
    product,
    recommendationComponent,
    pageTypeUpdated,
  ]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        product
      </div>
      <div className="nosto_product" style={{ display: "none" }}>
        {tagging?.variationId && (
          <span className="variation_id">{tagging.variationId}</span>
        )}
        {product && <span className="product_id">{product}</span>}
        {tagging?.name && <span className="name">{tagging.name}</span>}
        {tagging?.url && <span className="url">{tagging.url.toString()}</span>}
        {tagging?.imageUrl && (
          <span className="image_url">{tagging.imageUrl.toString()}</span>
        )}
        {tagging?.availability && (
          <span className="availability">{tagging.availability}</span>
        )}
        {tagging?.price && <span className="price">{tagging.price}</span>}
        {tagging?.listPrice && (
          <span className="list_price">{tagging.listPrice}</span>
        )}
        {tagging?.priceCurrencyCode && (
          <span className="price_currency_code">
            {tagging.priceCurrencyCode}
          </span>
        )}
        {tagging?.brand && <span className="brand">{tagging.brand}</span>}
        {tagging?.description && (
          <span className="description">{tagging.description}</span>
        )}
        {tagging?.googleCategory && (
          <span className="description">{tagging.googleCategory}</span>
        )}
        {tagging?.condition && (
          <span className="condition">{tagging.condition}</span>
        )}
        {tagging?.gender && <span className="gender">{tagging.gender}</span>}
        {tagging?.ageGroup && (
          <span className="age_group">{tagging.ageGroup}</span>
        )}
        {tagging?.gtin && <span className="gtin">{tagging.gtin}</span>}
        {tagging?.category &&
          tagging?.category.map((category, index) => (
            <span className="category" key={index}>
              {category}
            </span>
          ))}
        {tagging?.tags1 &&
          tagging.tags1.map((tag, index) => (
            <span className="tag1" key={index}>
              {tag}
            </span>
          ))}
        {tagging?.tags2 &&
          tagging.tags2.map((tag, index) => (
            <span className="tag2" key={index}>
              {tag}
            </span>
          ))}
        {tagging?.tags3 &&
          tagging.tags3.map((tag, index) => (
            <span className="tag3" key={index}>
              {tag}
            </span>
          ))}
        {tagging?.ratingValue && (
          <span className="rating_value">{tagging.ratingValue}</span>
        )}
        {tagging?.reviewCount && (
          <span className="review_count">{tagging.reviewCount}</span>
        )}
        {tagging?.alternateImageUrls &&
          tagging.alternateImageUrls.map((url, index) => (
            <span className="alternate_image_url" key={index}>
              {url.toString()}
            </span>
          ))}
        {tagging?.customFields &&
          Object.keys(tagging.customFields).map(
            (field, index) =>
              tagging.customFields &&
              tagging.customFields[field] && (
                <span className={field} key={index}>
                  {tagging.customFields[field]}
                </span>
              )
          )}
        {tagging?.skus &&
          tagging.skus.map((sku, index) => (
            <span className="nosto_sku" key={index}>
              {sku?.id && <span className="product_id">{sku.id}</span>}
              {sku?.name && <span className="name">{sku.name}</span>}
              {sku?.price && <span className="price">{sku.price}</span>}
              {sku?.listPrice && (
                <span className="list_price">{sku.listPrice}</span>
              )}
              {sku?.url && <span className="url">{sku.url.toString()}</span>}
              {sku?.imageUrl && (
                <span className="image_url">{sku.imageUrl.toString()}</span>
              )}
              {sku?.gtin && <span className="gtin">{sku.gtin}</span>}
              {sku?.availability && (
                <span className="availability">{sku.availability}</span>
              )}
              {sku?.customFields &&
                Object.keys(sku.customFields).map(
                  (field, index) =>
                    sku.customFields &&
                    sku.customFields[field] && (
                      <span className={field} key={index}>
                        {sku.customFields[field]}
                      </span>
                    )
                )}
            </span>
          ))}
      </div>
    </>
  );
}
