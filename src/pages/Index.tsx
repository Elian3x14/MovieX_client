import HeroSlider from "@/components/HeroSlider";
import MovieSlider from "@/components/MovieSlider";
import PromotionCard from "@/components/PromotionCard";
import CinemaCard from "@/components/CinemaCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { promotions, Movie } from "@/data/type";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { fetchCinemas } from "@/features/cinema/cinemaSlice";
import { fetchMovies } from "@/features/movie/movieSlice";

const Index = () => {

  const dispatch = useAppDispatch();
  const { movies, loading, error } = useAppSelector((state) => state.movie);
  const { cinemas } = useAppSelector((state) => state.cinema);

  useEffect(() => {
    if (Object.keys(movies).length === 0) {
      dispatch(fetchMovies());
    }
  }, [dispatch, movies]);

  useEffect(() => {
    if (Object.keys(cinemas).length === 0) {
      dispatch(fetchCinemas());
    }
  }, [dispatch, cinemas]);


  const nowShowingMovies = Object.values(movies);
  const upcomingMovies = Object.values(movies);

  // Lấy vài phim đầu tiên làm phim nổi bật
  const featuredMovies = Object.values(movies).slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-cinema-background text-cinema-text">
      <main className="flex-1">

        {/* Phần trình chiếu nổi bật */}
        <HeroSlider movies={featuredMovies} />

        {/* Phần phim */}
        <section className="py-12 container">
          <MovieSlider
            nowShowingMovies={nowShowingMovies}
            upcomingMovies={upcomingMovies}
          />
        </section>

        {/* Phần rạp chiếu */}
        <section className="py-12 bg-black/30">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6">Rạp chiếu phim của chúng tôi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(cinemas).map((cinema) => (
                <CinemaCard key={cinema.id} cinema={cinema} />
              ))}
            </div>
          </div>
        </section>

        {/* Phần khuyến mãi */}
        <section className="py-12 container">
          <h2 className="text-2xl font-bold mb-6">Ưu đãi đặc biệt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promotion) => (
              <PromotionCard key={promotion.id} promotion={promotion} />
            ))}
          </div>
        </section>

        {/* Phần tải ứng dụng */}
        <section className="py-12 bg-gradient-to-r from-cinema-primary/20 to-cinema-accent/20">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Tải ứng dụng di động của chúng tôi
                </h2>
                <p className="text-cinema-muted mb-6">
                  Trải nghiệm xem phim tuyệt vời hơn với ứng dụng di động. Đặt vé, xem lịch chiếu, và nhận các ưu đãi độc quyền ngay trên điện thoại của bạn.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <FaAppStoreIos />
                    App Store
                  </Button>
                  <Button variant="outline" size="lg" className="flex items-center gap-2">
                    <FaGooglePlay />
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="w-full max-w-sm">
                <Card className="border-none shadow-xl bg-cinema-background">
                  <CardContent className="p-0">
                    <img
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Ứng dụng di động"
                      className="w-full h-auto rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Phần Câu hỏi thường gặp */}
        <section className="py-12 container">
          <h2 className="text-2xl font-bold mb-6">Câu hỏi thường gặp</h2>
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="booking" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="booking">Đặt vé</TabsTrigger>
                <TabsTrigger value="payment">Thanh toán</TabsTrigger>
                <TabsTrigger value="general">Chung</TabsTrigger>
              </TabsList>

              {/* Tab: Đặt vé */}
              <TabsContent value="booking">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">Làm thế nào để đặt vé online?</h3>
                    <p className="text-cinema-muted">
                      Bạn có thể đặt vé bằng cách chọn phim, chọn suất chiếu, chọn ghế và hoàn tất thanh toán.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">Tôi có thể hủy vé không?</h3>
                    <p className="text-cinema-muted">
                      Bạn có thể hủy vé trước giờ chiếu 4 tiếng. Tiền hoàn sẽ được xử lý theo chính sách hoàn tiền của chúng tôi.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">Làm sao để nhận vé?</h3>
                    <p className="text-cinema-muted">
                      Bạn có thể đưa mã e-ticket trên điện thoại tại cổng vào hoặc in vé ra. Với một số đơn hàng, bạn cần đến quầy để nhận vé giấy.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab: Thanh toán */}
              <TabsContent value="payment">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">Những phương thức thanh toán nào được chấp nhận?</h3>
                    <p className="text-cinema-muted">
                      Chúng tôi chấp nhận thẻ tín dụng, thẻ ghi nợ, ví điện tử và chuyển khoản ngân hàng.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">Thanh toán online có an toàn không?</h3>
                    <p className="text-cinema-muted">
                      Có, mọi giao dịch được bảo vệ bằng mã hóa SSL và tuân thủ tiêu chuẩn bảo mật trong ngành.
                    </p>
                  </div>
                </div>
              </TabsContent>

              {/* Tab: Chung */}
              <TabsContent value="general">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">Có ưu đãi dành cho hội viên không?</h3>
                    <p className="text-cinema-muted">
                      Có, hội viên được giảm giá vé, ưu tiên đặt vé và nhận khuyến mãi độc quyền. Đăng ký tài khoản miễn phí để bắt đầu.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card">
                    <h3 className="font-medium text-lg mb-2">Giờ hoạt động của rạp chiếu phim là gì?</h3>
                    <p className="text-cinema-muted">
                      Rạp chiếu phim của chúng tôi mở cửa từ 10:00 sáng đến 12:00 đêm hàng ngày. Giờ có thể thay đổi vào dịp lễ hoặc sự kiện đặc biệt.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Index;
