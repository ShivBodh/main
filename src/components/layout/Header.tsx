
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu, Mail, Twitter, Facebook, Podcast, Gem, LogIn, LogOut, LayoutDashboard, ChevronDown, HandHeart, Users, Landmark, CalendarDays, BookOpen, Heart, Sparkles, SunMoon, TestTube2, Atom, Brush } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { peethams } from '@/lib/peethams-data';


const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
        return names[0][0] + names[names.length-1][0];
    }
    return names[0][0];
}

const peethamLinks = peethams.map(p => ({
    title: p.name,
    href: p.link,
    description: p.description,
    icon: Landmark
}));

const socialLinks = [
    { 
        title: "Social Hub",
        href: "/social",
        description: "Connect with the global Sanatani community on our secure platform.",
        icon: Users
    },
    { 
        title: "Knowledge Quiz",
        href: "/quiz",
        description: "Test your knowledge about the four cardinal Peethams.",
        icon: TestTube2,
    },
    { 
        title: "Seva Hub",
        href: "/seva",
        description: "Explore the sacred geography via an interactive map.",
        icon: HandHeart,
    },
];

const bodhaLinks = [
     { 
        title: "Bodha Calendar",
        href: "/events",
        description: "A living archive of events, media, and discourses from the Peethams.",
        icon: CalendarDays,
    },
    { 
        title: "Reading Room",
        href: "/reading",
        description: "A curated library of foundational texts by great masters.",
        icon: BookOpen,
    },
    { 
        title: "Panchanga",
        href: "/panchanga",
        description: "View daily astrological details for the four cardinal regions.",
        icon: SunMoon,
    },
     { 
        title: "Sādhanā Suite",
        href: "/sadhana",
        description: "Digital tools to support your daily spiritual practice.",
        icon: Atom,
    },
];

const aboutLinks = [
    {
        title: "Our Mission",
        href: "/mission",
        description: "Learn why this portal was created as a service to Dharma.",
        icon: Heart,
    },
    {
        title: "Our Philosophy",
        href: "/philosophy",
        description: "Understand Shivbodh, our guiding principle.",
        icon: Sparkles,
    },
    {
        title: "Contact Us",
        href: "/contact",
        description: "Get in touch with the volunteer team.",
        icon: Mail,
    }
];

const allMobileLinks = [
  { group: 'Peethams', links: peethamLinks },
  { group: 'Social', links: socialLinks },
  { group: 'Bodha', links: bodhaLinks },
  { group: 'About', links: aboutLinks },
];


const AuthNav = () => {
    const { user, loading, logout } = useAuth();

    if (loading) {
        return <Skeleton className="h-10 w-24 rounded-md" />;
    }

    if (user) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border-2 border-primary/50">
                            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link href="/social?tab=profile">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>My Hub</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
         <Button asChild>
            <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
            </Link>
        </Button>
    );
};

export function Header() {
  const { user, loading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Gem className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline text-primary sm:text-lg">Sanatana Peethams Portal</span>
          </Link>
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Peethams</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {peethamLinks.map((link) => (
                                <ListItem key={link.title} title={link.title} href={link.href} icon={link.icon}>
                                    {link.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <NavigationMenuTrigger>Social</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md" href="/social">
                                        <Users className="h-8 w-8 text-primary" />
                                        <div className="mb-2 mt-4 text-lg font-headline font-medium">
                                            Sanatan Social
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                           A private, secure platform for devotees to connect and support dharmic causes.
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                             {socialLinks.slice(1).map((link) => ( // Show other links except the main hub
                                <ListItem key={link.title} title={link.title} href={link.href} icon={link.icon}>
                                    {link.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <NavigationMenuTrigger>Bodha</NavigationMenuTrigger>
                    <NavigationMenuContent>
                         <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {bodhaLinks.map((link) => (
                                <ListItem key={link.title} title={link.title} href={link.href} icon={link.icon}>
                                    {link.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                    <NavigationMenuTrigger>About</NavigationMenuTrigger>
                    <NavigationMenuContent>
                         <ul className="grid w-[300px] gap-3 p-4">
                            {aboutLinks.map((link) => (
                                <ListItem key={link.title} title={link.title} href={link.href} icon={link.icon}>
                                    {link.description}
                                </ListItem>
                            ))}
                         </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:flex items-center space-x-2">
          <Link href="https://twitter.com/shivabodha_org" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="https://www.facebook.com/profile.php?id=61560464994999" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <Link href="https://open.spotify.com/show/2junC5HBTu63wvAULgujbR" target="_blank" rel="noopener noreferrer" aria-label="Spotify Podcast">
            <Podcast className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </Link>
          <LanguageSwitcher />
          <Separator orientation="vertical" className="h-6 mx-2" />
          <AuthNav />
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <Link href="/" className="mb-2 flex items-center space-x-2">
                    <Gem className="h-7 w-7 text-primary" />
                    <span className="font-bold font-headline text-primary text-lg">Sanatana Peethams Portal</span>
                </Link>
                <nav className="flex flex-col space-y-1">
                    {allMobileLinks.map((group) => (
                      <div key={group.group}>
                        <h3 className="px-1 pt-4 pb-1 text-sm font-semibold text-muted-foreground">{group.group}</h3>
                        {group.links.map((item) => (
                          <SheetClose asChild key={item.title}>
                          <Link href={item.href} className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-accent py-2 px-1 rounded-md">
                              <item.icon className="h-5 w-5 text-primary/80" />
                              {item.title}
                          </Link>
                          </SheetClose>
                        ))}
                      </div>
                    ))}
                </nav>
                <div className="border-t pt-6 space-y-4">
                  {loading ? <Skeleton className="h-10 w-full" /> : user ? (
                    <>
                      <SheetClose asChild>
                        <Link href="/social?tab=profile" className="flex items-center space-x-2 text-lg font-medium transition-colors hover:text-accent">
                          <LayoutDashboard className="h-6 w-6" />
                          <span>My Hub</span>
                        </Link>
                      </SheetClose>
                       <SheetClose asChild>
                        <button onClick={logout} className="w-full flex items-center space-x-2 text-lg font-medium transition-colors hover:text-accent text-destructive">
                          <LogOut className="h-6 w-6" />
                          <span>Logout</span>
                        </button>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link href="/login" className="flex items-center space-x-2 text-lg font-medium transition-colors hover:text-accent">
                        <LogIn className="h-6 w-6" />
                        <span>Login</span>
                      </Link>
                    </SheetClose>
                  )}
                  <Separator />
                   <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Link href="https://twitter.com/shivabodha_org" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <Twitter className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                        </Link>
                        <Link href="https://www.facebook.com/profile.php?id=61560464994999" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                        </Link>
                        <Link href="https://open.spotify.com/show/2junC5HBTu63wvAULgujbR" target="_blank" rel="noopener noreferrer" aria-label="Spotify Podcast">
                            <Podcast className="h-6 w-6 text-muted-foreground hover:text-foreground" />
                        </Link>
                      </div>
                      <LanguageSwitcher />
                   </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary/80"/>
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground pl-7">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

    
