import dayjs from "dayjs";
import "dayjs/locale/ja";

const DATE_FORMAT = "YYYY年M月D日";
const DATETIME_FORMAT = "YYYY年M月D日 HH:mm";

export const formatDate = (dateString: string) => {
  return dayjs(dateString).locale("ja").format(DATE_FORMAT);
};

export const formatDateTime = (dateString: string) => {
  return dayjs(dateString).locale("ja").format(DATETIME_FORMAT);
};
