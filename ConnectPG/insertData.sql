INSERT INTO public."KHACH_HANG"(
	"MA_KH", "TEN_KH", "EMAIL", "SDT", "USERNAME", "PASSWORD")
	VALUES (1, 'Trần Duy Khang', 'khang123@gmail', '0938549163', 'khang', '123'),
	(2, 'Võ Nhất Khanh', 'khanh123@gmail', '0923549163', 'khanh', '123'),
	(3, 'Nguyễn Quốc Khoa', 'khoa123@gmail', '0938521163', 'khoa', '123'),
	(4, 'Ông Hoàng', 'hoang123@gmail', '0923549163', 'hoang', '123');
	
	
INSERT INTO PUBLIC."MON_AN"(
	"MA_MON_AN","TEN_MON_AN","GIA_BAN"
) VALUES(1,'Cơm Sườn',25000),
(2,'Phở',30000),
(3,'Mì quảng',25000);

INSERT INTO PUBLIC."LOAI_HANG"(
	"MA_LOAI_HANG","TEN_LOAI_HANG"
) VALUES(1,'Thức uống'),(2,'Dụng cụ học tập');


INSERT INTO PUBLIC."MAT_HANG"(
	"MA_MAT_HANG","MA_LOAI_HANG","TEN_MAT_HANG","IMG_URL"
)
VALUES(1,1,'CocaCola','coca.png'),
		(2,1,'Pepsi','pepsi.png'),
		(3,1,'Revive','revive.png'),
		(4,2,'Bút bi Thiên Long','butbi.png');

select * from public."MAT_HANG"

INSERT INTO PUBLIC."MAT_HANG_TRONG_KHO"(
	"MA_MAT_HANG","SO_LUONG","GIA"
)VALUES(1,20,15000), 
(2,10,12000),
(4,13,7000);

insert into public."NGUOI_BAN"
(
	"MA_NGUOI_BAN","USERNAME","PASSWORD","TEN_NGUOI_BAN"
) VALUES(1,'ha','123','Nguyễn Thu Hà');

INSERT INTO PUBLIC."DON_HANG"(

	"MA_DON_HANG","ID_KH","NGAY_MUA","TRANG_THAI","ID_NGUOI_BAN"
)
VALUES(1,1,'2022/11/07',TRUE,1);

INSERT INTO PUBLIC."CHI_TIET_DON_HANG"
(
	"MA_DON_HANG","MA_MAT_HANG","SO_LUONG","GIA_BAN","THANH_TIEN","LOAI"
)VALUES(1,1,2,25000,25000,0),(1,2,1,15000,15000,1);

INSERT INTO PUBLIC."THUC_AN_TRONG_KHO"
(
	"MA_MON_AN","SO_LUONG"
)VALUES(1,20),(2,15);

SELECT*FROM PUBLIC."THUC_AN_TRONG_KHO"




