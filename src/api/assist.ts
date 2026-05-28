import { AssistQueryParams } from "@/types/assist";
import api from "./index"
import { CODE_AS, makeUrl } from "./base";

function assistUrl(url: string = ''): string {
  return makeUrl(CODE_AS, url);
}

export const assistApi = {
  // 获取科目列表
  getSubjects(params: AssistQueryParams) {
    return api.get(assistUrl('/subjects'), params)
  }
}

