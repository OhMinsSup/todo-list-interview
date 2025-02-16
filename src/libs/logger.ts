type LogCategory = "server-action" | "hono-rpc" | "browser";

type Extra = Record<string, unknown>;

class Logger {
  output = console;

  info(label: LogCategory, message: string, extra?: Extra) {
    this.output.info(message, { ...extra, label });
  }

  debug(label: LogCategory, message: string, extra?: Extra) {
    this.output.debug(message, { ...extra, label });
  }

  error(label: LogCategory, message: string, error: Error, extra?: Extra) {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Sentry.captureException(error, (scope) => {
      //   scope.clear();
      //   scope.setLevel("error");
      //   scope.setTag("category", label);
      //   for (const key in extra) {
      //     scope.setExtra(key, extra[key]);
      //   }
      //   return scope;
      // });
    }

    if (process.env.NODE_ENV === "production") {
      this.output.error(message, {
        error: error.message,
        stack: error.stack,
      });
    } else {
      console.error(message);
      console.error(error);
      if (extra) {
        console.error(extra);
      }
    }
  }
}

export default new Logger();
