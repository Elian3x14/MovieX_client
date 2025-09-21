import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-7xl font-bold text-destructive mb-4">
          403
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Bạn không có quyền truy cập vào trang này.
        </p>
        <Button
          asChild
          variant="link"
          className="mb-4 underline decoration-dashed decoration-1 hover:decoration-solid"
        >
          <Link to="/">Quay về trang chủ</Link>
        </Button>
      </div>
    </div>
  );
};

export default ForbiddenPage;
