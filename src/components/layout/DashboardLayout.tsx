
'use client';

import React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Gem, Users, Calendar, BookOpen, Atom, HelpCircle, Gamepad2, Settings, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/lib/utils';

const mainNavLinks = [
  { href: '/social', icon: Users, label: 'Social' },
  { href: '/events', icon: Calendar, label: 'Calendar' },
  { href: '/reading', icon: BookOpen, label: 'Reading' },
  { href: '/sadhana', icon: Atom, label: 'Sādhanā' },
];

const helpNavLinks = [
  { href: '/mission', icon: HelpCircle, label: 'Our Mission' },
];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Gem className="size-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">Sādhanā Suite</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {mainNavLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                 <Link href={link.href} passHref>
                    <SidebarMenuButton tooltip={link.label}>
                      <link.icon />
                      <span>{link.label}</span>
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
           <SidebarMenu>
                {helpNavLinks.map((link) => (
                  <SidebarMenuItem key={link.href}>
                     <Link href={link.href} passHref>
                        <SidebarMenuButton tooltip={link.label}>
                          <link.icon />
                          <span>{link.label}</span>
                        </SidebarMenuButton>
                     </Link>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <Link href={user ? "/social?tab=profile" : "/login"} passHref>
                    <SidebarMenuButton tooltip={user ? 'Profile' : 'Login'}>
                      {user ? <Avatar className="size-6"><AvatarImage src={user.photoURL || ''} /><AvatarFallback className="text-xs">{getInitials(user.displayName)}</AvatarFallback></Avatar> : <User />}
                      <span>{user ? 'Profile' : 'Login'}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
           </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
