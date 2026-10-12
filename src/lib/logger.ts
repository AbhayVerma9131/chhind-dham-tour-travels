type LogLevel = "debug" | "info" | "warn" | "error";

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  error?: unknown;
}

function emitLog(payload: LogPayload) {
  const isProd = process.env.NODE_ENV === "production";
  
  if (isProd) {
    // In production, emit JSON without leaking raw passwords or credentials
    console.log(JSON.stringify(payload));
  } else {
    const time = new Date(payload.timestamp).toLocaleTimeString();
    const prefix = `[${time}] [${payload.level.toUpperCase()}]`;
    if (payload.level === "error") {
      console.error(prefix, payload.message, payload.error || "", payload.context || "");
    } else if (payload.level === "warn") {
      console.warn(prefix, payload.message, payload.context || "");
    } else {
      console.log(prefix, payload.message, payload.context || "");
    }
  }
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    emitLog({ level: "info", message, timestamp: new Date().toISOString(), context });
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    emitLog({ level: "warn", message, timestamp: new Date().toISOString(), context });
  },
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    emitLog({
      level: "error",
      message,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? { name: error.name, message: error.message } : error,
      context,
    });
  },
  debug: (message: string, context?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== "production") {
      emitLog({ level: "debug", message, timestamp: new Date().toISOString(), context });
    }
  },
};
