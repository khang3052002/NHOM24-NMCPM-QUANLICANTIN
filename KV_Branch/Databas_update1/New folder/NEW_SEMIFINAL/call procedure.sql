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
