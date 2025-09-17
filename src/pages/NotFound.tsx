const NotFound = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-7xl font-bold text-destructive mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">
          Ôi! Trang bạn đang tìm kiếm không tồn tại.
        </p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Quay về trang chủ
        </a>
      </div>
    </div>
  );
};

export default NotFound;
