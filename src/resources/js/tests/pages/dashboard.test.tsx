import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderToString } from "react-dom/server";
import { type Post, type User } from "@/types/models";
import { sampleUser } from "../fixtures/sampleUser";
import { createInertiaPageMock, registerRouteMock } from "../setup/inertia";
import { createAuthenticatedLayoutMock } from "../setup/layout";

type DashboardProps = {
  auth: { user: User };
  stats?: {
    totalPosts?: number;
    publishedPosts?: number;
    draftPosts?: number;
  };
  recentPosts?: Array<Pick<Post, "id" | "title" | "status" | "created_at" | "user">>;
};

const pageState = vi.hoisted(() => ({
  current: undefined as DashboardProps | undefined,
}));

vi.mock("@inertiajs/react", () => createInertiaPageMock(() => pageState.current));
vi.mock("@/Layouts/AuthenticatedLayout", () => createAuthenticatedLayoutMock());

describe("Dashboard page", () => {
  beforeEach(() => {
    registerRouteMock();
    pageState.current = undefined;
  });

  const renderDashboard = async () => {
    const { default: Dashboard } = await import("@/Pages/Dashboard");
    return renderToString(<Dashboard />);
  };

  it("renders stats and recent posts without crashing", async () => {
    pageState.current = {
      auth: { user: sampleUser },
      stats: { totalPosts: 3, publishedPosts: 2, draftPosts: 1 },
      recentPosts: [
        {
          id: 2,
          title: "Latest post",
          status: "published",
          created_at: "2024-01-05T00:00:00.000Z",
          user: sampleUser,
        },
        {
          id: 1,
          title: "Older draft",
          status: "draft",
          created_at: "2024-01-04T00:00:00.000Z",
          user: sampleUser,
        },
      ],
    };

    const html = await renderDashboard();

    expect(html).toContain("総記事数");
    expect(html).toContain("3");
    expect(html).toContain("記事のサマリー");
    expect(html).toContain("最近の更新");
    expect(html).toContain("Latest post");
    expect(html).toContain("Older draft");
  });

  it("renders empty state when there are no recent posts", async () => {
    pageState.current = {
      auth: { user: sampleUser },
      stats: { totalPosts: 0, publishedPosts: 0, draftPosts: 0 },
      recentPosts: [],
    };

    const html = await renderDashboard();

    expect(html).toContain("最近の更新はまだありません");
    expect(html).toContain("最初の記事を作成して、ダッシュボードに表示してみましょう。");
  });
});
