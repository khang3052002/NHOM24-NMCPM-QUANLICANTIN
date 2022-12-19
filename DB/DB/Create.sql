Create or replace function random_string(length integer) returns text as
$$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ language plpgsql;
-----------------------------
DROP SEQUENCE IF EXISTS AdminId CASCADE;
CREATE SEQUENCE AdminId
INCREMENT 1    
MINVALUE 0
START 0 ; 
---------------------------------------
DROP SEQUENCE IF EXISTS CustomerId CASCADE;
CREATE SEQUENCE CustomerId
INCREMENT 1    
MINVALUE 0
START 0 ; 
---------------------------------
---------------------------------------
DROP SEQUENCE IF EXISTS CartId CASCADE;
CREATE SEQUENCE CartId
INCREMENT 1    
MINVALUE 0
START 0 ; 
---------------------------------

-- CREATE OR REPLACE FUNCTION nhapKho() RETURNS trigger AS $$
-- DECLARE expiredDate date;
-- DECLARE shelfTime int;
-- BEGIN
-- 	shelfTime:=(SELECT MH.HAN_SU_DUNG 
-- 		FROM MAT_HANG AS MH 
-- 		WHERE MH.MA_MAT_HANG=NEW.MA_MAT_HANG);
-- 	expiredDate:=NEW.NGAY_SAN_XUAT+interval '1 month' * shelfTime;
-- 	IF EXISTS(SELECT * FROM MAT_HANG_TRONG_KHO AS MHTK
-- 			 WHERE MHTK.MA_MAT_HANG=NEW.MA_MAT_HANG 
-- 			  and MHTK.NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT) THEN
-- 			  UPDATE MAT_HANG_TRONG_KHO 
-- 			  SET SO_LUONG=SO_LUONG+NEW.SO_LUONG
-- 			  	WHERE MA_MAT_HANG=NEW.MA_MAT_HANG 
-- 			  	and NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT;
-- 	ELSE	
-- 			INSERT INTO MAT_HANG_TRONG_KHO(MA_MAT_HANG,SO_LUONG,NGAY_SAN_XUAT,
-- 										  NGAY_HET_HAN) 
-- 			VALUES (NEW.MA_MAT_HANG,NEW.SO_LUONG,NEW.NGAY_SAN_XUAT,expiredDate);
-- 	END IF;
-- 	-------------------------------------------
-- 	IF EXISTS(SELECT * FROM SL_HANG_TRONG_KHO AS SLHTK
-- 			 WHERE SLHTK.MA_MAT_HANG=NEW.MA_MAT_HANG) THEN
-- 			  UPDATE SL_HANG_TRONG_KHO 
-- 			  SET SO_LUONG=(SELECT SUM(KHO.SO_LUONG) 
-- 							FROM MAT_HANG_TRONG_KHO AS KHO
-- 						   WHERE KHO.MA_MAT_HANG=NEW.MA_MAT_HANG)
-- 							, GIA=NEW.DON_GIA
-- 			  WHERE MA_MAT_HANG=NEW.MA_MAT_HANG ;
-- 	ELSE
-- 		INSERT INTO SL_HANG_TRONG_KHO(MA_MAT_HANG,SO_LUONG,GIA) 
-- 		VALUES (NEW.MA_MAT_HANG,NEW.SO_LUONG,NEW.DON_GIA);
-- 	END IF;

--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS nhapKho on CHI_TIET_NHAP_KHO;
-- CREATE TRIGGER nhapKho
-- AFTER INSERT ON CHI_TIET_NHAP_KHO
-- FOR EACH ROW EXECUTE PROCEDURE	nhapKho();
-- ----------------------------------------------------

-- CREATE OR REPLACE FUNCTION xuatKho() RETURNS trigger AS $$
-- DECLARE expiredDate date;
-- BEGIN
-- 	raise info 'heehe %', 'hehe' ;
-- 	expiredDate:=(SELECT MHTK.NGAY_HET_HAN 
-- 		FROM MAT_HANG_TRONG_KHO AS MHTK 
-- 		WHERE MHTK.MA_MAT_HANG=NEW.MA_MAT_HANG AND MHTK.NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT) ;
-- 	IF EXISTS(SELECT * FROM MAT_HANG_CANTEEN
-- 			 WHERE MA_MAT_HANG=NEW.MA_MAT_HANG 
-- 			  and NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT) THEN
-- 			  UPDATE MAT_HANG_CANTEEN 
-- 			  SET SO_LUONG=SO_LUONG+NEW.SO_LUONG
-- 			  WHERE MA_MAT_HANG=NEW.MA_MAT_HANG and NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT;
-- 	ELSE	
-- 			INSERT INTO MAT_HANG_CANTEEN(MA_MAT_HANG,SO_LUONG,NGAY_SAN_XUAT,
-- 										  NGAY_HET_HAN) 
-- 			VALUES (NEW.MA_MAT_HANG,NEW.SO_LUONG,NEW.NGAY_SAN_XUAT,expiredDate);
-- 	END IF;
-- 	-----------------------------------------
-- 	IF EXISTS(SELECT * FROM SL_HANG_CANTEEN AS SLHCT
-- 			 WHERE SLHCT.MA_MAT_HANG=NEW.MA_MAT_HANG) THEN
-- 			  UPDATE SL_HANG_CANTEEN 
-- 			  SET SO_LUONG=(SELECT SUM(CANTEEN.SO_LUONG) 
-- 							FROM MAT_HANG_CANTEEN AS CANTEEN
-- 						   WHERE CANTEEN.MA_MAT_HANG=NEW.MA_MAT_HANG)
-- 							, 
-- 			  GIA=NEW.DON_GIA
-- 			  WHERE MA_MAT_HANG=NEW.MA_MAT_HANG ;
-- 	ELSE
-- 		INSERT INTO SL_HANG_CANTEEN(MA_MAT_HANG,SO_LUONG,GIA) 
-- 		VALUES (NEW.MA_MAT_HANG,NEW.SO_LUONG,NEW.DON_GIA);
-- 	END IF;
-- 	-------------------------------------------------
-- 	IF (SELECT MHTK.SO_LUONG FROM MAT_HANG_TRONG_KHO AS MHTK
-- 		 WHERE MHTK.MA_MAT_HANG=NEW.MA_MAT_HANG and MHTK.NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT) > NEW.SO_LUONG THEN
-- 		 UPDATE MAT_HANG_TRONG_KHO
-- 		 SET SO_LUONG=SO_LUONG-NEW.SO_LUONG
-- 		 WHERE MA_MAT_HANG=NEW.MA_MAT_HANG and NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT;
-- 	ELSE
-- 		DELETE FROM MAT_HANG_TRONG_KHO
-- 		WHERE MA_MAT_HANG=NEW.MA_MAT_HANG and NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT;
-- 	END IF;
-- 	--------------------------------------------------
-- 	IF (SELECT SLHTK.SO_LUONG FROM SL_HANG_TRONG_KHO AS SLHTK
-- 		 WHERE SLHTK.MA_MAT_HANG=NEW.MA_MAT_HANG) > NEW.SO_LUONG THEN
-- 		 UPDATE SL_HANG_TRONG_KHO
-- 		 SET SO_LUONG=(SELECT SUM(KHO.SO_LUONG) 
-- 							FROM MAT_HANG_TRONG_KHO AS KHO
-- 						   WHERE KHO.MA_MAT_HANG=NEW.MA_MAT_HANG), GIA=NEW.GIA_BAN
-- 		 WHERE MA_MAT_HANG=NEW.MA_MAT_HANG;
-- 	ELSE
-- 		DELETE FROM SL_HANG_TRONG_KHO
-- 		WHERE MA_MAT_HANG=NEW.MA_MAT_HANG;
-- 	END IF;
-- 	---------------------------------------------------------
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS xuatKho on CHI_TIET_XUAT_KHO;
-- CREATE TRIGGER xuatKho
-- AFTER INSERT ON CHI_TIET_XUAT_KHO
-- FOR EACH ROW EXECUTE PROCEDURE xuatKho();
-- ------------------------------------------------------
-- CREATE OR REPLACE FUNCTION capNhatTrangThaiDonHang() RETURNS trigger AS $$
-- BEGIN
-- 	IF NEW.TRANG_THAI = 'DA NHAN HOA DON' THEN
-- 		UPDATE CHI_TIET_DON_HANG
-- 		SET TRANG_THAI = 'DA NHAN HOA DON'
-- 		WHERE MA_DON_HANG=NEW.MA_DON_HANG;
-- -- 		FOR SLTL, date IN (SELECT KHO.SO_LUONG,KHO.NGAY_SAN_XUAT FROM MAT_HANG_TRONG_KHO AS KHO 
-- -- 			WHERE KHO.MA_MAT_HANG=NEW.MA_MAT_HANG ORDER BY KHO.NGAY_SAN_XUAT)
-- -- 		LOOP
-- -- 			IF SLMUA==0 THEN RETURN NEW END IF
-- -- 			tempValue:=SLMUA-SLTL
-- -- 			IF tempValue<0 THEN
-- -- 		END LOOP
-- 	END IF;
	
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS capNhatTrangThaiDonHang on DON_HANG;
-- CREATE TRIGGER capNhatTrangThaiDonHang
-- AFTER UPDATE OF TRANG_THAI ON DON_HANG
-- FOR EACH ROW EXECUTE PROCEDURE capNhatTrangThaiDonHang();

-- ------------------------------------------------------------

-- -- ------------------------------------------------------
-- CREATE OR REPLACE FUNCTION nhanHang() RETURNS trigger AS $$
-- DECLARE SLMUA int = NEW.SO_LUONG; SLTL int; MFDate date; tempValue int; MAMH text=NEW.MA_MAT_HANG;
-- BEGIN
	
-- -- 	SLMUA:=1;
-- 	IF NEW.TRANG_THAI = 'DA NHAN HOA DON' THEN
-- 	IF EXISTS (SELECT * FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=NEW.MA_MAT_HANG) THEN
-- 		IF (SELECT SO_LUONG FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=NEW.MA_MAT_HANG)>SLMUA THEN
-- 			UPDATE SL_HANG_CANTEEN  SET SO_LUONG=SO_LUONG-SLMUA WHERE MA_MAT_HANG=NEW.MA_MAT_HANG;
-- 		ELSE
-- 			DELETE FROM SL_HANG_CANTEEN  WHERE MA_MAT_HANG=NEW.MA_MAT_HANG;
-- 		END IF;
-- 	END IF;
		
-- 	WHILE SLMUA>0 LOOP
-- 		IF SLMUA=0 THEN RETURN NEW; END IF;
-- 		FOR SLTL, MFDate IN (SELECT KHO.SO_LUONG,KHO.NGAY_SAN_XUAT FROM MAT_HANG_CANTEEN AS KHO 
-- 			WHERE KHO.MA_MAT_HANG=NEW.MA_MAT_HANG ORDER BY KHO.NGAY_SAN_XUAT)
-- 		LOOP
-- 				IF SLMUA=0 THEN RETURN NEW; END IF;
-- 					tempValue:=SLMUA-SLTL;
-- 					IF tempValue<0 THEN
-- 						UPDATE MAT_HANG_CANTEEN
-- 						SET SO_LUONG=-tempValue
-- 						WHERE MA_MAT_HANG=MAMH and MFDate=NGAY_SAN_XUAT;
-- 						SLMUA:=0;
-- 					END IF;

-- 					IF tempValue=0 THEN
-- 						DELETE FROM MAT_HANG_CANTEEN
-- 						WHERE MA_MAT_HANG=MAMH and MFDate=NGAY_SAN_XUAT;
-- 						SLMUA:=0;
-- 					END IF;

-- 					IF tempValue>0 THEN
-- 						DELETE FROM MAT_HANG_CANTEEN
-- 						WHERE MA_MAT_HANG=MAMH and MFDate=NGAY_SAN_XUAT;
-- 						SLMUA:=tempValue;
-- 					END IF;
-- 					IF SLMUA=0 THEN RETURN NEW; END IF;
-- 		END LOOP;
-- 		IF SLMUA=0 THEN RETURN NEW; END IF;
-- 	END LOOP;
-- 	END IF;
	
--     RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- DROP TRIGGER IF EXISTS nhanHang on CHI_TIET_DON_HANG;
-- CREATE TRIGGER nhanHang
-- AFTER UPDATE OF TRANG_THAI ON CHI_TIET_DON_HANG
-- FOR EACH ROW EXECUTE PROCEDURE nhanHang();

-- ------------------------------------------------------------
-- create or replace procedure themDonHang(
-- 	maMH text[], soLuong int[]
-- )
-- language plpgsql    
-- as $$
-- DECLARE idDonHang text; thanhTien int; index int:=1; giaBan int;
-- begin
--     INSERT INTO DON_HANG VALUES(DEFAULT,DEFAULT,DEFAULT,DEFAULT);
-- 	idDonHang:=(SELECT MA_DON_HANG FROM DON_HANG ORDER BY NGAY_MUA DESC LIMIT 1);
-- 	WHILE index <= array_length(maMH, 1) LOOP
-- 	giaBan:=(SELECT GIA FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=maMH[index]);
-- 	thanhTien:=soLuong[index]*giaBan;
-- 	INSERT INTO CHI_TIET_DON_HANG(MA_DON_HANG,MA_MAT_HANG,SO_LUONG,GIA_BAN,THANH_TIEN ) VALUES (idDonHang,maMH[index],soLuong[index],giaBan,thanhTien);
-- 	index:=index+1;
-- 	END LOOP;
	

-- end;$$;

-- -- call addNewBill('HJHJHJHJ',2,15000);
-- -----------------------------------------------------
-- create or replace procedure themPhieuNhapHang(
-- 	maMH text[], soLuong int[], donGia int[], ngaySX date[]
-- )
-- language plpgsql    
-- as $$
-- DECLARE idNhapHang text; index int:=1;
-- begin
--     INSERT INTO PHIEU_NHAP_KHO VALUES(DEFAULT,DEFAULT);
-- 	idNhapHang:=(SELECT MA_PHIEU FROM PHIEU_NHAP_KHO ORDER BY NGAY_NHAP DESC LIMIT 1);
-- 	WHILE index <= array_length(maMH, 1) LOOP
-- 	INSERT INTO CHI_TIET_NHAP_KHO(MA_PHIEU,MA_MAT_HANG,NGAY_SAN_XUAT,DON_GIA,SO_LUONG) VALUES (idNhapHang,maMH[index],ngaySX[index],donGia[index],soLuong[index]);
-- 	index:=index+1;
-- 	END LOOP;
-- end;$$;

-- ---------------------------------------------------------------
-- create or replace procedure themPhieuXuatHang(
-- 	maMH text[], soLuong int[], donGia int[], ngaySX date[]
-- )
-- language plpgsql    
-- as $$
-- DECLARE idXuatHang text;index int:=1;
-- begin
--     INSERT INTO PHIEU_XUAT_KHO VALUES(DEFAULT,DEFAULT);
-- 	idXuatHang:=(SELECT MA_PHIEU FROM PHIEU_XUAT_KHO ORDER BY NGAY_XUAT DESC LIMIT 1);
-- 	WHILE index <= array_length(maMH, 1) LOOP
-- 	INSERT INTO CHI_TIET_XUAT_KHO(MA_PHIEU,MA_MAT_HANG,NGAY_SAN_XUAT,DON_GIA,SO_LUONG) VALUES (idXuatHang,maMH[index],ngaySX[index],donGia[index],soLuong[index]);
-- 	index:=index+1;
-- 	END LOOP;
-- end;$$;
-- --------------------------------------------------------------




DROP TABLE IF EXISTS NGUOI_BAN CASCADE;
CREATE TABLE NGUOI_BAN (
	ID text DEFAULT 'ADMS' || lpad(nextval('AdminId')::text, 4, '0') NOT NULL,
	TAI_KHOAN varchar(50),
	MAT_KHAU varchar(50),
	HO_TEN varchar(50)
)
;
ALTER TABLE NGUOI_BAN ADD CONSTRAINT "PK_Nguoi_ban" PRIMARY KEY  (ID);


DROP TABLE IF EXISTS KHACH_HANG CASCADE;
CREATE TABLE KHACH_HANG(
	ID text DEFAULT 'CTMS' || lpad(nextval('CustomerId')::text, 4, '0') NOT NULL,
	TAI_KHOAN varchar(50),
	MAT_KHAU varchar(50),
	TEN_KH varchar(50),
	EMAIL varchar(50),
	SDT varchar(10),
	SO_DU int,
	ID_GIO_HANG text DEFAULT 'CART' || lpad(nextval('CartId')::text, 4, '0') NOT NULL
)
;
ALTER TABLE KHACH_HANG ADD CONSTRAINT "PK_Khach_hang" PRIMARY KEY (ID);
----------------------------------
DROP TABLE IF EXISTS CHI_TIET_GIO_HANG CASCADE;
CREATE TABLE CHI_TIET_GIO_HANG(
	ID_GIO_HANG text not null,
	MA_MAT_HANG text,
	SO_LUONG int
)
;
ALTER TABLE CHI_TIET_GIO_HANG ADD CONSTRAINT "PK_Gio_hang" PRIMARY KEY (ID_GIO_HANG,MA_MAT_HANG);
----------------------------------
DROP TABLE IF EXISTS LOAI_HANG CASCADE;
CREATE TABLE LOAI_HANG(
	MA_LOAI_HANG text NOT NULL,
	TEN_LOAI_HANG text
);
ALTER TABLE LOAI_HANG ADD CONSTRAINT "PK_LH" PRIMARY KEY (MA_LOAI_HANG);

-----------------------------------
---------------------------------
DROP TABLE IF EXISTS MAT_HANG CASCADE;
CREATE TABLE MAT_HANG(
	MA_MAT_HANG text DEFAULT 'GD' || lpad(random_string(6)::text, 6) NOT NULL,
	MA_LOAI_HANG text ,
	TEN_MAT_HANG text,
	IMG_URL text,
	HAN_SU_DUNG int DEFAULT 12,
	TIEN_LOI int
);
ALTER TABLE MAT_HANG ADD CONSTRAINT "PK_MH" PRIMARY KEY (MA_MAT_HANG);
ALTER TABLE MAT_HANG ADD CONSTRAINT "FK_MH_LH" FOREIGN KEY (MA_LOAI_HANG) REFERENCES LOAI_HANG(MA_LOAI_HANG);

---------------------------------
DROP TABLE IF EXISTS MAT_HANG_TRONG_KHO CASCADE;
CREATE TABLE MAT_HANG_TRONG_KHO(
	MA_MAT_HANG text NOT NULL,
	SO_LUONG int,
	NGAY_SAN_XUAT date,
	NGAY_HET_HAN date,
	TON_TAI int DEFAULT 1
);
ALTER TABLE MAT_HANG_TRONG_KHO ADD CONSTRAINT "PK_MH_Kho" PRIMARY KEY (MA_MAT_HANG,NGAY_SAN_XUAT);
ALTER TABLE MAT_HANG_TRONG_KHO ADD CONSTRAINT "FK_Kho_MH" FOREIGN KEY (MA_MAT_HANG) REFERENCES MAT_HANG(MA_MAT_HANG);

---------------------------------
DROP TABLE IF EXISTS SL_HANG_TRONG_KHO CASCADE;
CREATE TABLE SL_HANG_TRONG_KHO(
	MA_MAT_HANG text NOT NULL,
	SO_LUONG int,
	GIA int
);
ALTER TABLE SL_HANG_TRONG_KHO ADD CONSTRAINT "PK_SL_kho" PRIMARY KEY (MA_MAT_HANG);
-----------------------------------------------------
DROP TABLE IF EXISTS PHIEU_XUAT_KHO CASCADE;
CREATE TABLE PHIEU_XUAT_KHO(
	MA_PHIEU text DEFAULT 'DL' || lpad(random_string(6)::text, 6) NOT NULL,
	NGAY_XUAT timestamp DEFAULT current_timestamp 
);
ALTER TABLE PHIEU_XUAT_KHO ADD CONSTRAINT "PK_Phieu_xuat_kho" PRIMARY KEY (MA_PHIEU);
--------------------------------
DROP TABLE IF EXISTS CHI_TIET_XUAT_KHO CASCADE;
CREATE TABLE CHI_TIET_XUAT_KHO(
	MA_PHIEU text NOT NULL,
	MA_MAT_HANG text NOT NULL,
	DON_GIA int,
	SO_LUONG int
);
ALTER TABLE CHI_TIET_XUAT_KHO ADD CONSTRAINT "PK_Chi_tiet_xuat_kho" PRIMARY KEY (MA_PHIEU,MA_MAT_HANG);
ALTER TABLE CHI_TIET_XUAT_KHO ADD CONSTRAINT "FK_CTXK_PXK" FOREIGN KEY (MA_PHIEU) REFERENCES PHIEU_XUAT_KHO(MA_PHIEU);
-------------------------------------------------

---------------------------------
DROP TABLE IF EXISTS MAT_HANG_CANTEEN CASCADE;
CREATE TABLE MAT_HANG_CANTEEN(
	MA_MAT_HANG text NOT NULL,
	SO_LUONG int,
	NGAY_SAN_XUAT date,
	NGAY_HET_HAN date,
	TON_TAI int DEFAULT 1
);
ALTER TABLE MAT_HANG_CANTEEN ADD CONSTRAINT "PK_MH_canteen" PRIMARY KEY (MA_MAT_HANG,NGAY_SAN_XUAT);
ALTER TABLE MAT_HANG_CANTEEN ADD CONSTRAINT "FK_Kho_MH" FOREIGN KEY (MA_MAT_HANG) REFERENCES MAT_HANG(MA_MAT_HANG);

---------------------------------
DROP TABLE IF EXISTS SL_HANG_CANTEEN CASCADE;
CREATE TABLE SL_HANG_CANTEEN(
	MA_MAT_HANG text NOT NULL,
	SO_LUONG int,
	GIA int,
	GIA_BAN_RA int
);
ALTER TABLE SL_HANG_CANTEEN ADD CONSTRAINT "PK_SLct" PRIMARY KEY (MA_MAT_HANG);
---------------------------------------------
-----------------------------------
DROP TABLE IF EXISTS DON_HANG CASCADE;
CREATE TABLE DON_HANG(
	MA_DON_HANG text DEFAULT 'ID' || lpad(random_string(6)::text, 6) NOT NULL,
	MA_KHACH_HANG text,
	NGAY_MUA timestamp DEFAULT current_timestamp,
	TRANG_THAI varchar(20) DEFAULT 'CHUA NHAN HOA DON'
);
ALTER TABLE DON_HANG ADD CONSTRAINT "PK_Don_hang" PRIMARY KEY (MA_DON_HANG);
------------------------------------------------
DROP TABLE IF EXISTS CHI_TIET_DON_HANG CASCADE;
CREATE TABLE CHI_TIET_DON_HANG(
	MA_DON_HANG text NOT NULL,
	MA_MAT_HANG text,
	SO_LUONG int,
	GIA_BAN int,
	THANH_TIEN int,
	TRANG_THAI varchar(20) DEFAULT 'CHUA NHAN HOA DON'
);
ALTER TABLE CHI_TIET_DON_HANG ADD CONSTRAINT "PK_CT_DH" PRIMARY KEY (MA_DON_HANG,MA_MAT_HANG);
ALTER TABLE CHI_TIET_DON_HANG ADD CONSTRAINT "FK_CTDH_DH" FOREIGN KEY (MA_DON_HANG) REFERENCES DON_HANG(MA_DON_HANG);
--------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS PHIEU_NHAP_KHO CASCADE;
CREATE TABLE PHIEU_NHAP_KHO(
	MA_PHIEU text DEFAULT 'ST' || lpad(random_string(6)::text, 6) NOT NULL,
	NGAY_NHAP timestamp DEFAULT current_timestamp
);
ALTER TABLE PHIEU_NHAP_KHO ADD CONSTRAINT "PK_Phieu_nhap_kho" PRIMARY KEY (MA_PHIEU);
--------------------------------
DROP TABLE IF EXISTS CHI_TIET_NHAP_KHO CASCADE;
CREATE TABLE CHI_TIET_NHAP_KHO(
	MA_PHIEU text  NOT NULL,
	MA_MAT_HANG text NOT NULL,
	NGAY_SAN_XUAT date,
	DON_GIA int,
	SO_LUONG int
);
ALTER TABLE CHI_TIET_NHAP_KHO ADD CONSTRAINT "PK_Chi_tiet_nhap_kho" PRIMARY KEY (MA_PHIEU,MA_MAT_HANG,NGAY_SAN_XUAT);
ALTER TABLE CHI_TIET_NHAP_KHO ADD CONSTRAINT "FK_CT_MH" FOREIGN KEY (MA_MAT_HANG) REFERENCES MAT_HANG(MA_MAT_HANG);
---------------------------------
DROP TABLE IF EXISTS MON_AN CASCADE;
CREATE TABLE MON_AN(
	MA_MON_AN text DEFAULT 'DH' || lpad(random_string(6)::text, 6) NOT NULL,
	TEN_MON_AN text,
	GIA_BAN int,
	IMG_URL text
);
ALTER TABLE MON_AN ADD CONSTRAINT "PK_MA" PRIMARY KEY (MA_MON_AN);
-----------------------------------
DROP TABLE IF EXISTS THUC_AN_TRONG_KHO;
CREATE TABLE THUC_AN_TRONG_KHO(
	MA_MON_AN text NOT NULL,
	SO_LUONG int
);
ALTER TABLE THUC_AN_TRONG_KHO ADD CONSTRAINT "PK_TATK" PRIMARY KEY (MA_MON_AN);
ALTER TABLE THUC_AN_TRONG_KHO ADD CONSTRAINT "FK_TATK_MA" FOREIGN KEY (MA_MON_AN) REFERENCES MON_AN(MA_MON_AN);
---------------------------------------------
---------------------------------------------


INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,SDT,EMAIL,SO_DU) VALUES 
('khoamagjk','hjhjhj','079546556','khoacamrank@gmail.com',1500000),
('khanhtrumpc2','hjhjhj','035674032','khanhtrumpc2@gmail.com',1500000),
('hoangkhanhs','hjhjhj','0642138','khang300502@gmail.com',1500000),
('khangchan','hjhjhj','85656554','khoacamrank@gmail.com',1500000);

INSERT INTO NGUOI_BAN(TAI_KHOAN,MAT_KHAU,HO_TEN) VALUES 
('KhanhHEHE','lameo','uhuhu'),
('Khanhasjfh','lameoasfd','uhuhuasdf'),
('Khasfsjfh','laasfsfd','uasdfuasdf');

INSERT INTO LOAI_HANG(MA_LOAI_HANG,TEN_LOAI_HANG) VALUES 
('TYNU','Nước uống'),
('TYDCHT','Dụng cụ học tập'),
('TYDAV','Đồ ăn vặt');

DROP TABLE IF EXISTS DOANH_THU_NGAY CASCADE;
CREATE TABLE DOANH_THU_NGAY(
	NGAY date DEFAULT CURRENT_DATE NULL,
	DOANH_THU bigint,
	TG_CAP_NHAT timestamp DEFAULT current_timestamp
);
ALTER TABLE DOANH_THU_NGAY ADD CONSTRAINT "PK_DTHUNGAY" PRIMARY KEY (NGAY);

INSERT INTO MAT_HANG(MA_LOAI_HANG,TEN_MAT_HANG,TIEN_LOI,IMG_URL) VALUES 
('TYNU','Sting dâu',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/sting_dau.jpg?alt=media&token=09c02a9a-fc67-4c9e-bea0-bce0020643b6'),
('TYNU','Pepsi',3000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/pepsi.jpg?alt=media&token=2c3101ff-ab9d-45dc-92dc-601fc9fb5ced'),
('TYNU','Cocacola',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/coca.jpg?alt=media&token=759af152-9c7f-41cd-b00a-50359eb708ab'),
('TYNU','Mountaindew',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/mountain_dew.jpg?alt=media&token=e6c1ed0e-9bc3-4e92-99ed-86ec2f208d95'),
('TYNU','Milo',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/milo.jpg?alt=media&token=748a5ea1-e151-42fb-b170-6547007fef7e'),
('TYNU','Revive',1000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/revive.jpg?alt=media&token=81721175-5e69-459e-96ea-e50098c4e86c'),
('TYNU','Trà đào',1000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/tra_dao.jpg?alt=media&token=66a2d1cf-735f-4d9c-ad9c-76e6826fc22e'),

('TYDAV','Bánh Nabatti',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/banh_nabati.jpg?alt=media&token=5ec0a684-a951-4f68-bc8b-c0300586058b'),
('TYDAV','Khô gà',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/kho_ga.jpg?alt=media&token=427277a7-c36f-4933-9d91-4fbaf4365000'),
('TYDAV','Bánh Oreo',3000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/oreo.jpg?alt=media&token=1c41146b-43e0-4fd5-821b-efc1ef26b587'),
('TYDAV','Bánh oishi',1000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/banh_oishi.jpg?alt=media&token=c4ee8507-dc1d-434a-9391-3936b6310945'),
('TYDAV','Cool air',1000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/cool_air.jpg?alt=media&token=bec0d431-f824-4f69-89f2-5f2bda5d70c3'),
('TYDAV','Lays',3000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/lays.jpg?alt=media&token=55a63dd2-e828-4363-becb-a5c2698c2d12'),
('TYDAV','Mì trẻ em',3000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/mi_tre_em.jpg?alt=media&token=4ba46285-0c6c-4dcd-8b38-571fe1d35c84'),
('TYDAV','Thạch dừa',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/thach_dua.jpg?alt=media&token=e442657b-e2a5-4e1c-a94d-e10f14b8796b'),

('TYDCHT','Bút xoá',3000, 'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/but_xoa.jpg?alt=media&token=56f0838c-a3ac-4f37-b6c3-9e7170809804'),
('TYDCHT','Cục tẩy',3000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/cuc_tay.jpg?alt=media&token=39d755e4-efed-4742-a016-297cac0a1a07'),
('TYDCHT','Bút chì',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/but_chi.jpg?alt=media&token=f24195da-6a1f-4957-bae2-9a84ed19bf63'),
('TYDCHT','Vở',2000,'https://firebasestorage.googleapis.com/v0/b/uploading-img-a8c96.appspot.com/o/vo.jpg?alt=media&token=bf1e0bd7-d209-48ac-9f27-09a6e2050dde');

INSERT INTO MON_AN(TEN_MON_AN,GIA_BAN) VALUES 
('Cơm sườn',25000),
('Phở',30000),
('Bún',20000);




