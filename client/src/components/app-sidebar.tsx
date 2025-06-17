"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "Big Dog",
    email: "KaiKane Anderson",
    avatar: "/canvas-logo-2.svg"
  },
  navMain: [
    {
      title: "Printify",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create New Product",
          url: "/admin/dashboard/new-p-product"
        },
        {
          title: "Edit Product",
          url: "#"
        },
        {
          title: "Delete Products",
          url: "#"
        },
        {
          title: "Webhooks",
          url: "#"
        }
      ]
    },
    {
      title: "Worker",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Order Fulfilment",
          url: "#"
        }
      ]
    },
    {
      title: "Database",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Emails",
          url: "#"
        },
        {
          title: "Contact Submissions",
          url: "#"
        },
        {
          title: "Orders",
          url: "#"
        },
        {
          title: "Product Variants",
          url: "#"
        }
      ]
    },

    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#"
        },
        {
          title: "Get Started",
          url: "#"
        },
        {
          title: "Tutorials",
          url: "#"
        },
        {
          title: "Changelog",
          url: "#"
        }
      ]
    }
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart
    },
    {
      name: "Travel",
      url: "#",
      icon: Map
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
