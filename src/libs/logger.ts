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
    if (process.env.NODE_ENV === "production") {
      this.output.error(message, {
        error: error.message,
        stack: error.stack,
      });
    } else {
      console.error(message);
      console.error(error);
      if (extra) {
        console.error({
          ...extra,
          label,
        });
      }
    }
  }
}

export default new Logger();
