import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex h-9 w-16 items-center justify-center rounded-md bg-sidebar-primary p-1 text-sidebar-primary-foreground">
                <AppLogoIcon className="h-full w-full fill-current object-contain text-white dark:text-black" />
            </div>
            <div className="ml-3 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate text-lg leading-tight font-bold">
                    TiketSync
                </span>
            </div>
        </>
    );
}
