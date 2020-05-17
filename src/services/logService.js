import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn:
      "https://6b31e606a83e4e7ab444d3347a4feb48@o362853.ingest.sentry.io/5226113",
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log,
};
