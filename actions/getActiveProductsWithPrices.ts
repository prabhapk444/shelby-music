import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ProductWithPrice } from "@/types";

const getActiveProducts = async (): Promise<ProductWithPrice[]> => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, prices(*)')
      .eq('active', true)
      .eq('prices.active', true)
      .order('metadata->index')
      .order('unit_amount', { foreignTable: 'prices' });

    if (error) {
      throw new Error(`Failed to fetch active products: ${error.message}`);
    }

    return data as ProductWithPrice[] || [];
  } catch (error) {
    console.error("Error fetching active products:", error);
    throw error;
  }
};

export default getActiveProducts;
