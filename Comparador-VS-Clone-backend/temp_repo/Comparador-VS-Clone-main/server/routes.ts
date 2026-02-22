import type { Express } from "express";
import { createServer, type Server } from "node:http";
import { ALL_PRODUCTS, CATEGORIES } from "../lib/data";

export async function registerRoutes(app: Express): Promise<Server> {
  // prefix all routes with /api
  app.get("/api/products", (_req, res) => {
    res.json(ALL_PRODUCTS);
  });

  app.get("/api/categories", (_req, res) => {
    res.json(CATEGORIES);
  });

  const httpServer = createServer(app);

  return httpServer;
}
