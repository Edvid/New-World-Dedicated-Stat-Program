import { type Stats } from "../stats/gameStats.js";

export interface SerializedStatsType {
  Lines: number;
  Hash: number;
  State: Stats;
}

/* #region  taken from blog https://robkendal.co.uk/blog/2020-04-17-saving-text-to-client-side-file-using-vanilla-js */
export const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });

  a.href = URL.createObjectURL(file);
  a.download = filename;
  a.click();

  URL.revokeObjectURL(a.href);
};
/* #endregion */
