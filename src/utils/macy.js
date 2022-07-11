
import Macy from "macy";

var macy = null;

export function macyInit() {
  if (macy != null) {
    macy.remove();
  }


  macy = Macy({
    container: "#macy-container",
    trueOrder: false,
    waitForImages: false,
    margin: 24,
    columns: 6,
    breakAt: {
      1200: 5,
      940: 3,
      520: 2,
      400: 1,
    },
  });
}
