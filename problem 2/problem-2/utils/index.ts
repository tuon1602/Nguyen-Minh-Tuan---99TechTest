import { Currency} from "@/types";

export function clearDuplicate(currency:Currency[],key:keyof Currency):Currency[]{
    const seen = new Set<string | number>();
    return currency.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      } else {
        seen.add(value);
        return true;
      }
    });
}