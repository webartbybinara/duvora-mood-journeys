import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/discovery': 'Mood Discovery',
  '/destinations': 'Destinations',
  '/about': 'About Us',
  '/contact': 'Contact',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on homepage
  if (location.pathname === '/') {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Build breadcrumb trail
  let currentPath = '';
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbItems.push({
      label,
      href: currentPath
    });
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <BreadcrumbItem key={item.href || item.label}>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-1">
                    {index === 0 && <Home className="w-4 h-4" aria-hidden="true" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.href!} 
                        className="flex items-center gap-1 hover:text-foreground transition-colors"
                      >
                        {index === 0 && <Home className="w-4 h-4" aria-hidden="true" />}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </BreadcrumbSeparator>
                  </>
                )}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}