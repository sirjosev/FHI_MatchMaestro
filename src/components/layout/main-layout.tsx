'use client';

import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutDashboard, Trophy, Users, CalendarDays, BarChart3, PieChart, ShieldQuestion } from 'lucide-react';
import Image from 'next/image';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  matchSegments?: number; // Number of path segments to match for active state
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, matchSegments: 1 },
  { href: '/competitions', label: 'Competitions', icon: Trophy, matchSegments: 1 },
  // Add more items as pages are created
  // { href: '/teams', label: 'Teams', icon: Users },
  // { href: '/matches', label: 'Matches', icon: CalendarDays },
  // { href: '/standings', label: 'Standings', icon: BarChart3 },
  // { href: '/statistics', label: 'Statistics', icon: PieChart },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { open } = useSidebar();

  const isActive = (href: string, matchSegments = 1) => {
    if (href === '/') return pathname === '/';
    const pathSegments = pathname.split('/').filter(Boolean);
    const hrefSegments = href.split('/').filter(Boolean);
    // Match specified number of segments
    return hrefSegments.every((segment, i) => i < matchSegments && segment === pathSegments[i]);
  };

  return (
    <>
      <Sidebar side="left" variant="sidebar" collapsible="icon">
        <SidebarHeader className="p-4 items-center flex flex-col">
           <Link href="/" className="flex items-center gap-2 mb-4">
            <ShieldQuestion className={`h-8 w-8 text-primary transition-all ${open ? 'rotate-[360deg]' : ''}`} />
            <h1 className={`font-headline text-xl font-semibold text-primary transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 md:opacity-100 group-data-[collapsible=icon]:opacity-0'}`}>
              Match Maestro
            </h1>
          </Link>
        </SidebarHeader>
        <ScrollArea className="flex-grow">
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <Link href={item.href} legacyBehavior passHref>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href, item.matchSegments)}
                      tooltip={item.label}
                    >
                      <a>
                        <item.icon />
                        <span>{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </ScrollArea>
        {/* SidebarFooter can be added here if needed */}
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          {/* Page specific title or breadcrumbs can go here */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold">
              {navItems.find(item => isActive(item.href, item.matchSegments))?.label || 'Match Maestro'}
            </h2>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </>
  );
}
