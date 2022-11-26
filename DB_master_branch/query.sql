
INSERT INTO MON_AN(TEN_MON_AN,GIA_BAN, IMG_URL) VALUES 
('Bún bò', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/bun_bo.jpg?alt=media&token=3221993c-da5e-4072-adbd-48f17c85de72'),
('Bún riêu', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/bun_rieu.jpg?alt=media&token=3f05148d-719d-4346-9004-03e81e67d96a'),
('Bún thịt nướng', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/bun_thit_nuong.jpg?alt=media&token=9b27266b-f05a-4658-a2b6-eb5761aa1693'),
('Cơm gà', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/com_ga.jpg?alt=media&token=c2ca97d0-2934-4ea3-a0ab-94afbd572c25'),
('Cơm sườn', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/com_suon.jpg?alt=media&token=2586e146-3dd9-4636-8be3-e3fe93a088ad'),
('Hủ tiếu', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/hu_tieu.jpg?alt=media&token=7fb2bf36-efc2-4b8d-bd87-921d0a6c1805'),
('Mì quảng', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/mi_quang.jpg?alt=media&token=b32dd5f6-6d29-46ee-b903-e75e75762cc0'),
('Phở', 25000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/pho.jpg?alt=media&token=85ff4fc1-14ac-4988-9764-da50ddc913a3');

SELECT * FROM MON_AN

INSERT INTO THUC_AN_TRONG_KHO(MA_MON_AN,SO_LUONG) VALUES
('DHnPymIJ',100),
('DHQJrWGG',100),
('DHfs7sP4',100),
('DH7s6DA1',100),
('DHOdyS7U',100),
('DHCuuBgD',100),
('DHU7WMdm',100),
('DHcJfjC4',100);




call suaDoiKhoThucAn(ARRAY['#DH88DibV','#DHZE4dgg'],ARRAY[25,30]);
--ma mh, so luong, don gia, ngay_san_xuat
call themPhieuNhapHang(ARRAY['#GDCxZxJT','#GDCxZxJT','#GDx3VH16','#GDCnX6D1'],ARRAY[10,10,15,20],ARRAY[17000,20000,30000,40000],'{2012-05-05,
ma mh, so luong																											 2012-07-07,2017-03-03,2019-01-01}');
call themPhieuXuatHang(ARRAY['#GDCxZxJT','#GDx3VH16','#GDCnX6D1'],ARRAY[15,8,7]);
--ma kh, ma mh, so luong
call themDonHang('CTMS0000',ARRAY['#GDCxZxJT','#DH88DibV'],ARRAY[2,3]);

UPDATE DON_HANG SET TRANG_THAI='DA NHAN HOA DON' WHERE MA_DON_HANG in ( SELECT MA_DON_HANG
      FROM DON_HANG 
      ORDER BY NGAY_MUA desc
      LIMIT 1)
--ma kh, ma mh, so luong
call themVaoGioHang('CTMS0000','#GDCxZxJT',3);

DELETE FROM DON_HANG;
DELETE FROM CHI_TIET_DON_HANG;

DELETE FROM PHIEU_NHAP_KHO;
DELETE FROM CHI_TIET_NHAP_KHO;

DELETE FROM CHI_TIET_XUAT_KHO;
DELETE FROM PHIEU_XUAT_KHO;

DELETE FROM MAT_HANG_CANTEEN;
DELETE FROM SL_HANG_CANTEEN;

DELETE FROM SL_HANG_TRONG_KHO;
DELETE FROM MAT_HANG_TRONG_KHO;


SELECT * FROM CHI_TIET_GIO_HANG;
SELECT * FROM THUC_AN_TRONG_KHO;
SELECT * FROM MON_AN;
SELECT * FROM khach_hang;
SELECT * FROM nguoi_ban;

SELECT * FROM public.don_hang;


SELECT * FROM public.chi_tiet_don_hang;

SELECT * FROM public.sl_hang_canteen;


SELECT * FROM public.mat_hang;
SELECT * FROM loai_hang;

SELECT * FROM public.mat_hang_canteen;


SELECT * FROM public.chi_tiet_xuat_kho;


SELECT * FROM public.phieu_xuat_kho;


SELECT * FROM public.phieu_nhap_kho;


SELECT * FROM public.chi_tiet_nhap_kho;


SELECT * FROM public.mat_hang_trong_kho;


SELECT * FROM public.sl_hang_trong_kho;