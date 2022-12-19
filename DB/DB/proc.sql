CREATE OR REPLACE FUNCTION nhapKho() RETURNS trigger AS $$
DECLARE expiredDate date;
DECLARE shelfTime int;
BEGIN
	shelfTime:=(SELECT MH.HAN_SU_DUNG 
		FROM MAT_HANG AS MH 
		WHERE MH.MA_MAT_HANG=NEW.MA_MAT_HANG);
	expiredDate:=NEW.NGAY_SAN_XUAT+interval '1 month' * shelfTime;
	IF EXISTS(SELECT * FROM MAT_HANG_TRONG_KHO AS MHTK
			 WHERE MHTK.MA_MAT_HANG=NEW.MA_MAT_HANG 
			  and MHTK.NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT) THEN
			  UPDATE MAT_HANG_TRONG_KHO 
			  SET SO_LUONG=SO_LUONG+NEW.SO_LUONG, TON_TAI=1
			  	WHERE MA_MAT_HANG=NEW.MA_MAT_HANG 
			  	and NGAY_SAN_XUAT=NEW.NGAY_SAN_XUAT;
	ELSE	
			INSERT INTO MAT_HANG_TRONG_KHO(MA_MAT_HANG,SO_LUONG,NGAY_SAN_XUAT,
										  NGAY_HET_HAN) 
			VALUES (NEW.MA_MAT_HANG,NEW.SO_LUONG,NEW.NGAY_SAN_XUAT,expiredDate);
	END IF;
	-------------------------------------------
	IF EXISTS(SELECT * FROM SL_HANG_TRONG_KHO AS SLHTK
			 WHERE SLHTK.MA_MAT_HANG=NEW.MA_MAT_HANG) THEN
			  UPDATE SL_HANG_TRONG_KHO 
			  SET SO_LUONG=SO_LUONG+NEW.SO_LUONG
							, GIA=NEW.DON_GIA
			  WHERE MA_MAT_HANG=NEW.MA_MAT_HANG ;
	ELSE
		INSERT INTO SL_HANG_TRONG_KHO(MA_MAT_HANG,SO_LUONG,GIA) 
		VALUES (NEW.MA_MAT_HANG,NEW.SO_LUONG,NEW.DON_GIA);
	END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS nhapKho on CHI_TIET_NHAP_KHO;
CREATE TRIGGER nhapKho
AFTER INSERT ON CHI_TIET_NHAP_KHO
FOR EACH ROW EXECUTE PROCEDURE	nhapKho();
----------------------------------------------------
-----------------------------------------------------

CREATE OR REPLACE FUNCTION xuatKho() RETURNS trigger AS $$
DECLARE maMH text = NEW.MA_MAT_HANG; soLuong int = NEW.SO_LUONG; MFDate date; EXPDate date; tempValue int; SLTL int;
giaHT int = (SELECT GIA FROM SL_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH); 
BEGIN
	IF soLuong <= (SELECT SO_LUONG FROM SL_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH) THEN
	WHILE soLuong>0 LOOP
		FOR SLTL, MFDate,EXPDate IN (SELECT KHO.SO_LUONG,KHO.NGAY_SAN_XUAT,KHO.NGAY_HET_HAN FROM MAT_HANG_TRONG_KHO AS KHO 
			WHERE KHO.MA_MAT_HANG=NEW.MA_MAT_HANG ORDER BY KHO.NGAY_SAN_XUAT)
		LOOP
					tempValue:=soLuong-SLTL;
					IF tempValue<0 THEN
						UPDATE MAT_HANG_TRONG_KHO
						SET SO_LUONG=-tempValue
						WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
						
						IF EXISTS (SELECT * FROM MAT_HANG_CANTEEN WHERE  MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate) THEN
							UPDATE MAT_HANG_CANTEEN SET SO_LUONG=SO_LUONG+soLuong, TON_TAI=1
							WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
						ELSE
							INSERT INTO MAT_HANG_CANTEEN(MA_MAT_HANG,SO_LUONG,NGAY_SAN_XUAT,NGAY_HET_HAN) VALUES
							(maMH,soLuong,MFDate,EXPDate);
						END IF;
						soLuong:=0;
					END IF;

					IF tempValue=0 THEN
						UPDATE MAT_HANG_TRONG_KHO
						SET SO_LUONG=0, TON_TAI=0
						WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
						
						IF EXISTS (SELECT * FROM MAT_HANG_CANTEEN WHERE  MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate) THEN
							UPDATE MAT_HANG_CANTEEN SET SO_LUONG=SO_LUONG+soLuong, TON_TAI=1
							WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
						ELSE
							INSERT INTO MAT_HANG_CANTEEN(MA_MAT_HANG,SO_LUONG,NGAY_SAN_XUAT,NGAY_HET_HAN) VALUES
							(maMH,soLuong,MFDate,EXPDate);
						END IF;
						
						soLuong:=0;
					END IF;

					IF tempValue>0 THEN
						UPDATE MAT_HANG_TRONG_KHO
						SET SO_LUONG=0, TON_TAI=0
						WHERE MA_MAT_HANG=MAMH and NGAY_SAN_XUAT=MFDate;
						
						IF EXISTS (SELECT * FROM MAT_HANG_CANTEEN WHERE  MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate) THEN
							UPDATE MAT_HANG_CANTEEN SET SO_LUONG=SO_LUONG+SLTL, TON_TAI=1
							WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
						ELSE
							INSERT INTO MAT_HANG_CANTEEN(MA_MAT_HANG,SO_LUONG,NGAY_SAN_XUAT,NGAY_HET_HAN) VALUES
							(maMH,SLTL,MFDate,EXPDate);
						END IF;
						soLuong:=tempValue;
					END IF;
		END LOOP;
	END LOOP;
	
	------Cap nhat tong so luong hang trong kho
	IF NOT EXISTS(SELECT * FROM MAT_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH and TON_TAI=1) THEN
		UPDATE SL_HANG_TRONG_KHO SET SO_LUONG=0 WHERE MA_MAT_HANG=maMH;
	ELSE
		UPDATE SL_HANG_TRONG_KHO SET SO_LUONG=(SELECT SUM(SO_LUONG) FROM MAT_HANG_TRONG_KHO
										   WHERE MA_MAT_HANG=maMH AND TON_TAI=1) 
		WHERE MA_MAT_HANG=maMH;
		
	END IF;

	IF NOT EXISTS(SELECT * FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=maMH ) THEN
		INSERT INTO SL_HANG_CANTEEN(MA_MAT_HANG,SO_LUONG,GIA) VALUES (maMH,NEW.SO_LUONG,giaHT);
	ELSE
		UPDATE SL_HANG_CANTEEN SET SO_LUONG=(SELECT SUM(SO_LUONG) FROM MAT_HANG_CANTEEN
										   WHERE MA_MAT_HANG=maMH AND TON_TAI=1), GIA= giaHT
		WHERE MA_MAT_HANG=maMH;
	END IF;
	ELSE
		raise exception 'Số lượng xuất lớn hơn số lượng hiện có';
	END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS xuatKho on CHI_TIET_XUAT_KHO;
CREATE TRIGGER xuatKho
AFTER INSERT ON CHI_TIET_XUAT_KHO
FOR EACH ROW EXECUTE PROCEDURE xuatKho();
------------------------------------------------------
CREATE OR REPLACE FUNCTION capNhatTrangThaiDonHang() RETURNS trigger AS $$
BEGIN
	IF NEW.TRANG_THAI = 'DA NHAN HOA DON' THEN
		UPDATE CHI_TIET_DON_HANG
		SET TRANG_THAI = 'DA NHAN HOA DON'
		WHERE MA_DON_HANG=NEW.MA_DON_HANG;
	END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS capNhatTrangThaiDonHang on DON_HANG;
CREATE TRIGGER capNhatTrangThaiDonHang
AFTER UPDATE OF TRANG_THAI ON DON_HANG
FOR EACH ROW EXECUTE PROCEDURE capNhatTrangThaiDonHang();

------------------------------------------------------------

-- ------------------------------------------------------
CREATE OR REPLACE FUNCTION nhanHang() RETURNS trigger AS $$
DECLARE SLMUA int = NEW.SO_LUONG; SLTL int; MFDate date; tempValue int; MAMH text=NEW.MA_MAT_HANG;
BEGIN

	IF EXISTS (SELECT * FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=MAMH) THEN
	IF SLMUA <=(SELECT SO_LUONG FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=MAMH) THEN
	
	UPDATE SL_HANG_CANTEEN  SET SO_LUONG=SO_LUONG-SLMUA WHERE MA_MAT_HANG=NEW.MA_MAT_HANG;
	
	WHILE SLMUA>0 LOOP
		IF SLMUA=0 THEN RETURN NEW; END IF;
		FOR SLTL, MFDate IN (SELECT KHO.SO_LUONG,KHO.NGAY_SAN_XUAT FROM MAT_HANG_CANTEEN AS KHO 
			WHERE KHO.MA_MAT_HANG=NEW.MA_MAT_HANG ORDER BY KHO.NGAY_SAN_XUAT)
		LOOP
				IF SLMUA=0 THEN RETURN NEW; END IF;
					tempValue:=SLMUA-SLTL;
					IF tempValue<0 THEN
						UPDATE MAT_HANG_CANTEEN
						SET SO_LUONG=-tempValue
						WHERE MA_MAT_HANG=MAMH and MFDate=NGAY_SAN_XUAT;
						SLMUA:=0;
					END IF;

					IF tempValue=0 THEN
						UPDATE MAT_HANG_CANTEEN SET SO_LUONG=0, TON_TAI=0
						WHERE MA_MAT_HANG=MAMH and MFDate=NGAY_SAN_XUAT;
						SLMUA:=0;
					END IF;

					IF tempValue>0 THEN
						UPDATE MAT_HANG_CANTEEN SET SO_LUONG=0, TON_TAI=0
						WHERE MA_MAT_HANG=MAMH and MFDate=NGAY_SAN_XUAT;
						SLMUA:=tempValue;
					END IF;
					IF SLMUA=0 THEN RETURN NEW; END IF;
		END LOOP;
		IF SLMUA=0 THEN RETURN NEW; END IF;
	END LOOP;
	
	ELSE
		raise exception 'Số lượng mua lớn hơn số lượng hiện có';
	END IF;
	END IF;
	IF EXISTS (SELECT * FROM THUC_AN_TRONG_KHO WHERE MA_MON_AN=MAMH) THEN
		IF SLMUA<=(SELECT SO_LUONG FROM THUC_AN_TRONG_KHO WHERE MA_MON_AN=MAMH) THEN
			UPDATE THUC_AN_TRONG_KHO SET SO_LUONG=SO_LUONG-SLMUA WHERE MA_MON_AN=MAMH;
			ELSE
			raise exception 'Không đủ thức ăn';
		END IF;
		ELSE
			raise exception 'Không tồn tại mã món ăn';
	END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS nhanHang on CHI_TIET_DON_HANG;
CREATE TRIGGER nhanHang
AFTER INSERT ON CHI_TIET_DON_HANG
FOR EACH ROW EXECUTE PROCEDURE nhanHang();

------------------------------------------------------------
-- ------------------------------------------------------
CREATE OR REPLACE FUNCTION capNhatGiaBan() RETURNS trigger AS $$
BEGIN
	UPDATE SL_HANG_CANTEEN SET GIA_BAN_RA=NEW.GIA+(SELECT TIEN_LOI FROM MAT_HANG WHERE MA_MAT_HANG=NEW.MA_MAT_HANG) WHERE MA_MAT_HANG=NEW.MA_MAT_HANG;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS themMoiGiaBan on SL_HANG_CANTEEN;
CREATE TRIGGER themMoiGiaBan
AFTER INSERT ON SL_HANG_CANTEEN
FOR EACH ROW EXECUTE PROCEDURE capNhatGiaBan();
----------------------------------------------------------------

DROP TRIGGER IF EXISTS capNhatGiaBan on SL_HANG_CANTEEN;
CREATE TRIGGER capNhatGiaBan
AFTER UPDATE OF SO_LUONG ON SL_HANG_CANTEEN
FOR EACH ROW EXECUTE PROCEDURE capNhatGiaBan();
------------------------------------------------------------
create or replace procedure themDonHang(
	maKH text,maMH text[], soLuong int[], INOUT maDonHang text default null
)
language plpgsql    
as $$
DECLARE idDonHang text; thanhTien int; index int:=1; giaBan int; tongTien int=0;
begin
    INSERT INTO DON_HANG VALUES(DEFAULT,maKH,DEFAULT,DEFAULT);
	idDonHang:=(SELECT MA_DON_HANG FROM DON_HANG ORDER BY NGAY_MUA DESC LIMIT 1);
	WHILE index <= array_length(maMH, 1) LOOP
		IF EXISTS (SELECT * FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=maMH[index]) THEN
			giaBan:=(SELECT GIA FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=maMH[index]);
		ELSE 
		END IF;
		IF EXISTS (SELECT * FROM THUC_AN_TRONG_KHO WHERE MA_MON_AN=maMH[index]) THEN
			giaBan:=(SELECT GIA_BAN FROM MON_AN WHERE MA_MON_AN=maMH[index]);
		ELSE
		END IF;
	thanhTien:=soLuong[index]*giaBan;
	tongTien:=tongTien+thanhTien;
	INSERT INTO CHI_TIET_DON_HANG(MA_DON_HANG,MA_MAT_HANG,SO_LUONG,GIA_BAN,THANH_TIEN ) VALUES (idDonHang,maMH[index],soLuong[index],giaBan,thanhTien);
	index:=index+1;
	END LOOP;
	IF maKH NOT LIKE 'ADMS%' THEN
		IF tongTien<=(SELECT SO_DU FROM KHACH_HANG WHERE ID=maKH)  THEN
			UPDATE KHACH_HANG SET SO_DU=SO_DU-tongTien WHERE ID=maKH ;
		ELSE 

		ROLLBACK;
		raise exception 'Không đủ tiền để mua';
		END IF;
	END IF;
	maDonHang:=idDonHang;
end;$$;

-----------------------------------------------------
create or replace procedure themPhieuNhapHang(
	maMH text[], soLuong int[], donGia int[], ngaySX date[], INOUT trangThai text DEFAULT NULL
)
language plpgsql    
as $$
DECLARE idNhapHang text; index int:=1;
begin
    INSERT INTO PHIEU_NHAP_KHO VALUES(DEFAULT,DEFAULT);
	idNhapHang:=(SELECT MA_PHIEU FROM PHIEU_NHAP_KHO ORDER BY NGAY_NHAP DESC LIMIT 1);
	WHILE index <= array_length(maMH, 1) LOOP
	INSERT INTO CHI_TIET_NHAP_KHO(MA_PHIEU,MA_MAT_HANG,NGAY_SAN_XUAT,DON_GIA,SO_LUONG) VALUES (idNhapHang,maMH[index],ngaySX[index],donGia[index],soLuong[index]);
	index:=index+1;
	END LOOP;
	trangThai:=idNhapHang;
end;$$;

---------------------------------------------------------------
create or replace procedure themPhieuXuatHang(
	maMH text[], soLuong int[],INOUT trangThai text  DEFAULT NULL
)
language plpgsql    
as $$
DECLARE idXuatHang text;index int:=1; donGia int;
begin
    INSERT INTO PHIEU_XUAT_KHO VALUES(DEFAULT,DEFAULT);
	idXuatHang:=(SELECT MA_PHIEU FROM PHIEU_XUAT_KHO ORDER BY NGAY_XUAT DESC LIMIT 1);
	WHILE index <= array_length(maMH, 1) LOOP
	donGia:=(SELECT GIA FROM SL_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH[index]);
	INSERT INTO CHI_TIET_XUAT_KHO(MA_PHIEU,MA_MAT_HANG,DON_GIA,SO_LUONG) VALUES (idXuatHang,maMH[index],donGia,soLuong[index]);
	index:=index+1;
	END LOOP;
	trangThai:=idXuatHang;
end;$$;

---------------------------------------------------------------
create or replace procedure xoaHangTrongKho(
	maMH text, MFDate date
)
language plpgsql    
as $$
begin
    IF EXISTS (SELECT * FROM MAT_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate) THEN
		DELETE FROM MAT_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
		UPDATE SL_HANG_TRONG_KHO SET SO_LUONG = (SELECT SUM(SO_LUONG) FROM MAT_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate)
		WHERE MA_MAT_HANG=maMH;
	ELSE
		raise exception 'Không tồn tại hàng cần xoá';
	END IF;
end;$$;
------------------------------------------------------------
create or replace procedure themVaoGioHang(
	maKH text, maMH text, soLuong int
)
language plpgsql    
as $$
begin
	IF NOT EXISTS (SELECT * FROM CHI_TIET_GIO_HANG ct, KHACH_HANG kh WHERE ct.id_gio_hang=kh.id_gio_hang and kh.id=maKH and 
				  ct.ma_mat_hang=maMH) THEN
	INSERT INTO CHI_TIET_GIO_HANG(ID_GIO_HANG,MA_MAT_HANG,SO_LUONG) VALUES ((SELECT ID_GIO_HANG FROM KHACH_HANG WHERE ID=maKH),maMH,soLuong);
	ELSE
	UPDATE CHI_TIET_GIO_HANG SET SO_LUONG =SO_LUONG + soLuong where ma_mat_hang=maMH;
	END IF;
end;$$;
---------------------------------------------------------------

create or replace procedure capNhatGioHang(
	maKH text, maMH text[], soLuong int[]
)
language plpgsql    
as $$
DECLARE index int=1; idGioHang text=(SELECT id_gio_hang FROM KHACH_HANG WHERE id=maKH);
begin
	DELETE FROM CHI_TIET_GIO_HANG WHERE ID_GIO_HANG=(SELECT ID_GIO_HANG FROM KHACH_HANG WHERE id=maKH);
	WHILE index <= array_length(maMH,1) LOOP
	INSERT INTO CHI_TIET_GIO_HANG values(idGioHang, maMH[index],soLuong[index]);
	index:=index+1;
	END LOOP;
end;$$;
---------------------------------------------------------------

create or replace procedure xoaHangCanteen(
	maMH text, MFDate date
)
language plpgsql    
as $$
begin
    IF EXISTS (SELECT * FROM MAT_HANG_CANTEEN WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate) THEN
		UPDATE MAT_HANG_CANTEEN SET SO_LUONG=0, TON_TAI=0 WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
		UPDATE SL_HANG_CANTEEN SET SO_LUONG = (SELECT SUM(SO_LUONG) FROM MAT_HANG_CANTEEN WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate)
		WHERE MA_MAT_HANG=maMH;
	ELSE
		raise exception 'Không tồn tại hàng cần xoá';
	END IF;
end;$$;

---------------------------------------------------------------

create or replace procedure xoaHangTrongKho(
	maMH text, MFDate date
)
language plpgsql    
as $$
begin
    IF EXISTS (SELECT * FROM MAT_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate) THEN
		UPDATE MAT_HANG_TRONG_KHO SET SO_LUONG=0, TON_TAI=0 WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate;
		UPDATE SL_HANG_TRONG_KHO SET SO_LUONG = (SELECT SUM(SO_LUONG) FROM MAT_HANG_TRONG_KHO WHERE MA_MAT_HANG=maMH and NGAY_SAN_XUAT=MFDate)
		WHERE MA_MAT_HANG=maMH;
	ELSE
		raise exception 'Không tồn tại hàng cần xoá';
	END IF;
end;$$;
------------------------------------------------------------
create or replace procedure suaGiaMatHangCanteen(
	maMH text, giaMoi int
)
language plpgsql    
as $$
begin
    IF EXISTS (SELECT * FROM SL_HANG_CANTEEN WHERE MA_MAT_HANG=maMH) THEN
		UPDATE SL_HANG_CANTEEN SET GIA=giaMoi WHERE MA_MAT_HANG=maMH;
	ELSE
		raise exception 'Không tồn tại hàng cần sửa giá';
	END IF;
end;$$;
------------------------------------------------------------

------------------------------------------------------------
create or replace procedure themMatHangMoi(
	maLH text,
	tenMH text,
	imgUrl text,
	tienLoi int,
	hsd int DEFAULT NULL
)
language plpgsql    
as $$
begin
    hsd:=COALESCE(hsd, 12);
	INSERT INTO MAT_HANG(MA_LOAI_HANG,TEN_MAT_HANG,IMG_URL,HAN_SU_DUNG,TIEN_LOI) VALUES
	(maLH,tenMH,imgUrl,hsd,tienLoi);
end;$$;
------------------------------------------------------------

drop procedure themMonAnMoi
create or replace procedure themMonAnMoi(
	tenMA text,
	giaBan int,
	img_url text
)
language plpgsql    
as $$
begin
	INSERT INTO MON_AN(TEN_MON_AN,GIA_BAN,IMG_URL) VALUES (tenMA,giaBan,img_url);
end;$$;
------------------------------------------------------------

create or replace procedure suaDoiKhoThucAn(
	maMA text[],
	soLuong int[]
)
language plpgsql    
as $$
DECLARE index int=1;
begin
	DELETE FROM THUC_AN_TRONG_KHO;
	WHILE index <= array_length(maMA,1) LOOP
	INSERT INTO THUC_AN_TRONG_KHO values(maMA[index],soLuong[index]);
	index:=index+1;
	END LOOP;
end;$$;
------------------------------------------------------------


create or replace procedure capNhatThanhCongChoDonHangMoiNHat(
)
language plpgsql    
as $$
begin
	UPDATE DON_HANG SET TRANG_THAI='DA NHAN HOA DON' WHERE MA_DON_HANG in ( SELECT MA_DON_HANG
      FROM DON_HANG 
      ORDER BY NGAY_MUA desc
      LIMIT 1);
end;$$;
------------------------------------------------------------

create or replace procedure capNhatThanhCongChoDonHangMoiNHat(
	maDH text
)
language plpgsql    
as $$
begin
	UPDATE DON_HANG SET TRANG_THAI='DA NHAN HOA DON' WHERE MA_DON_HANG =maDH;
end;$$;
------------------------------------------------------------

---------------------------------------------------------------
drop procedure if exists capNhatDoanhThu
create or replace procedure capNhatDoanhThu(
INOUT doanhThu bigint default null)
language plpgsql    
as $$
begin
 	doanhThu:=(SELECT SUM(tien_1_don) FROM (SELECT sum(ct.thanh_tien) as tien_1_don FROM DON_HANG dh, chi_tiet_don_hang ct WHERE current_date=dh.ngay_mua::timestamp::date and dh.ma_don_hang=ct.ma_don_hang 
	group by dh.ma_don_hang) AS List);
	
    IF NOT EXISTS (SELECT * FROM DOANH_THU_NGAY WHERE NGAY=current_date )THEN
	INSERT INTO DOANH_THU_NGAY(DOANH_THU) VALUES(doanhThu);
	ELSE
	UPDATE DOANH_THU_NGAY SET DOANH_THU=doanhThu, TG_CAP_NHAT=current_timestamp WHERE NGAY=current_date;
	END IF;
end;$$;


drop procedure if exists doanhThuThang
create or replace procedure doanhThuThang(
 thang int default null, INOUT doanhThuThang bigint default NULL)
language plpgsql    
as $$
begin
 	thang:=COALESCE(thang, EXTRACT(MONTH FROM CURRENT_DATE));
	doanhThuThang:=(SELECT SUM(dtn.doanh_thu) FROM DOANH_THU_NGAY dtn WHERE EXTRACT(MONTH FROM dtn.ngay)=thang);
end;$$;

call capNhatDoanhThu()
SELECT * FROM DOANH_THU_NGAY
call doanhThuThang()
