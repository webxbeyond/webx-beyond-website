import { Banner } from 'fumadocs-ui/components/banner';

const CustomBanner = () => {
  return (
    <Banner
      variant="normal"
      title="Welcome to Our Platform"
      id="customBanner"
      className="bg-blue-100 border border-blue-400 text-blue-700 p-4"
    >
      If you want to learn Web Development{' '}
      <a href="https://anisafifi.dev" className="text-blue-500 underline">
        Click Here
      </a>
    </Banner>
  );
};

export default CustomBanner;
