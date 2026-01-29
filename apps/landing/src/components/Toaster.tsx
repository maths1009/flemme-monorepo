import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      {...props}
      className="toaster group"
      theme="light"
      toastOptions={{
        classNames: {
          actionButton: 'group-[.toast]:bg-brand-black group-[.toast]:text-brand-bg group-[.toast]:font-bold',
          cancelButton: 'group-[.toast]:bg-transparent group-[.toast]:text-brand-black group-[.toast]:underline',
          description: 'group-[.toast]:text-brand-black/80 group-[.toast]:font-sans group-[.toast]:text-sm',
          icon: 'group-data-[type=success]:!text-service-green group-data-[type=error]:!text-service-pink group-data-[type=info]:!text-service-blue group-data-[type=warning]:!text-brand-yellow',
          title:
            'group-[.toast]:font-serif group-[.toast]:text-lg group-[.toast]:font-medium data-[type=success]:!text-service-green data-[type=error]:!text-service-pink data-[type=info]:!text-service-blue data-[type=warning]:!text-brand-yellow',
          toast:
            'group toast group-[.toaster]:bg-brand-bg group-[.toaster]:text-brand-black group-[.toaster]:border-2 group-[.toaster]:border-brand-black group-[.toaster]:shadow-[4px_4px_0px_0px_1e1e1e] group-[.toaster]:rounded-xl group-[.toaster]:p-4 group-[.toaster]:gap-3',
        },
      }}
    />
  );
};

export { Toaster };
