import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import Image from "next/image"
import Link from "next/link"
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Paginatioon";

const PRODUCT_PER_PAGE = 8

const ProductList = async ({ 
  categoryId, 
  limit,
  searchParams,
}: { 
  categoryId: string; 
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer()
  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", searchParams?.type ? [searchParams.type] : ["physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );
    // .find()

  if (searchParams?.sort) {
    const [sortType, sortBy] = searchParams.sort.split(" ");

    if (sortType === "asc") {
      productQuery.ascending(sortBy);
    }
    if (sortType === "desc") {
      productQuery.descending(sortBy);
    }
  }

  const res = await productQuery.find();

  return (
    <div className="mt-12 flex justify-between flex-wrap gap-x-8 gap-y-16">
      {res.items.map((product: products.Product) => (
        <Link 
          href={"/" + product.slug} 
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]" 
          key={product._id}
        >
          <div className="relative w-full h-80">
            <Image 
              src={product.media?.mainMedia?.image?.url || "product.png"}
              alt="" 
              fill 
              sizes="25vw" 
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
            />
            {product.media?.items && (
              <Image 
                src={product.media?.items[1].image?.url || "product.png"}
                alt="" 
                fill 
                sizes="25vw" 
                className="absolute object-cover rounded-md"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">{product.priceData?.formatted?.discountedPrice || product.priceData?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections?.find((section: any) => section.title === "shortDesc")?.description || ""
                ),
              }}
            ></div>
          )}
          <button className="rounded-2xl ring-1 ring-badgeNumber text-badgeNumber w-max px-4 py-2 text-xs hover:bg-badgeNumber hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
      {/* <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image 
            src="https://images.pexels.com/photos/25188494/pexels-photo-25188494/free-photo-of-close-up-of-a-cup-of-coffee-on-a-tray.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
          />
          <Image 
            src="https://images.pexels.com/photos/25255070/pexels-photo-25255070/free-photo-of-two-women-walking-down-a-narrow-alleyway-in-a-small-town.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>
        <button className="rounded-2xl ring-1 ring-badgeNumber text-badgeNumber w-max px-4 py-2 text-xs hover:bg-badgeNumber hover:text-white">Add to Cart</button>
      </Link> */}
      {/* <Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image 
            src="https://images.pexels.com/photos/20318312/pexels-photo-20318312/free-photo-of-woman-with-black-hair-sitting-in-living-room.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
          />
          <Image 
            src="https://images.pexels.com/photos/10942845/pexels-photo-10942845.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>
        <button className="rounded-2xl ring-1 ring-badgeNumber text-badgeNumber w-max px-4 py-2 text-xs hover:bg-badgeNumber hover:text-white">Add to Cart</button>
      </Link><Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image 
            src="https://images.pexels.com/photos/25665221/pexels-photo-25665221/free-photo-of-fashionable-man-puts-on-headphones.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
          />
          <Image 
            src="https://images.pexels.com/photos/25639556/pexels-photo-25639556/free-photo-of-florence.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>
        <button className="rounded-2xl ring-1 ring-badgeNumber text-badgeNumber w-max px-4 py-2 text-xs hover:bg-badgeNumber hover:text-white">Add to Cart</button>
      </Link><Link href="/test" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image 
            src="https://images.pexels.com/photos/7495924/pexels-photo-7495924.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity ease duration-500"
          />
          <Image 
            src="https://images.pexels.com/photos/23408294/pexels-photo-23408294/free-photo-of-two-people-are-sitting-on-the-edge-of-a-pier.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" 
            alt="" 
            fill 
            sizes="25vw" 
            className="absolute object-cover rounded-md"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Product Name</span>
          <span className="font-semibold">$49</span>
        </div>
        <div className="text-sm text-gray-500">My description</div>
        <button className="rounded-2xl ring-1 ring-badgeNumber text-badgeNumber w-max px-4 py-2 text-xs hover:bg-badgeNumber hover:text-white">Add to Cart</button>
      </Link> */}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      ) : null}
    </div>
  )
}

export default ProductList