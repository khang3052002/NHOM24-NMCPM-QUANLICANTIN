call themPhieuNhapHang('{#GD6GTggv,#GD7ZFchn}'::text[],ARRAY[120,100],ARRAY[10000,20000],'{2014-07-07,2014-07-08}'::date[]);
call themPhieuXuatHang('{#GD6GTggv,#GD7ZFchn}'::text[],ARRAY[120,100],ARRAY[10000,20000],'{2014-07-07,2014-07-08}'::date[]);

call themDonHang('{#GD6GTggv,#GD7ZFchn}'::text[],ARRAY[2,3])

UPDATE DON_HANG 
SET TRANG_THAI = 'DA NHAN HOA DON'
WHERE MA_DON_HANG in (
      SELECT MA_DON_HANG
      FROM DON_HANG 
      ORDER BY NGAY_MUA desc
      LIMIT 1
)

-- DELETE FROM CHI_TIET_XUAT_KHO;
-- DELETE FROM PHIEU_XUAT_KHO;

DELETE FROM DON_HANG;
DELETE FROM CHI_TIET_DON_HANG;

'${json.stringify()}'
-- call themPhieuNhapHang('#GDaEskcO',130,15000,'2018-05-05');
-- call themPhieuNhapHang('#GD3ydpkg',10,20000,'2018-04-04');
-- call themPhieuNhapHang('#GD3ydpkg',300,203100,'2018-04-04');
SELECT * FROM public.don_hang
ORDER BY ma_don_hang ASC 

SELECT * FROM public.chi_tiet_don_hang
ORDER BY ma_don_hang ASC, ma_mat_hang ASC 

SELECT * FROM public.sl_hang_canteen
ORDER BY ma_mat_hang ASC 

SELECT * FROM public.mat_hang
ORDER BY ma_mat_hang ASC 

SELECT * FROM public.mat_hang_canteen
ORDER BY ma_mat_hang ASC, ngay_san_xuat ASC 

SELECT * FROM public.chi_tiet_xuat_kho
ORDER BY ma_phieu ASC, ma_mat_hang ASC, ngay_san_xuat ASC 

SELECT * FROM public.phieu_xuat_kho
ORDER BY ma_phieu ASC 

trigger INSERT NEW ROW CHI_TIET_NHAP_KHO

SELECT * FROM public.phieu_nhap_kho
ORDER BY ma_phieu ASC ;

SELECT * FROM public.chi_tiet_nhap_kho
ORDER BY ma_phieu ASC, ma_mat_hang ASC, ngay_san_xuat ASC ;

SELECT * FROM public.mat_hang_trong_kho
ORDER BY ma_mat_hang ASC, ngay_san_xuat ASC;

SELECT * FROM public.sl_hang_trong_kho
ORDER BY ma_mat_hang ASC ;

NHAP KHO VOI XUAT KHO cho chọn món hàng x số lượng y
DON_HANG ->trạng thái -> ĐÃ NHẬN HÀNG VÀ CHI_TIET_DON_HANG ->trạng thái LẪN LỘN MẶT HÀNG VÀ MÓN ĂN PHÂN BIỆT NHAU = ID->15 rows
FOR
NEW OLD
Cocal 2 nsx 15/12/2022 SL 4

Lấy ra là 14 chai coca ->11