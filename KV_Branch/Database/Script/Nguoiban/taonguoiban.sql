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

DROP TABLE IF EXISTS NGUOI_BAN;
CREATE TABLE NGUOI_BAN (
	MA_NGUOI_BAN text DEFAULT 'ADMS' || lpad(nextval('AdminId')::text, 4, '0') NOT NULL,
	TAI_KHOAN varchar(50),
	MAT_KHAU varchar(50),
	HO_TEN varchar(50)
)
;
ALTER TABLE NGUOI_BAN ADD CONSTRAINT "PK_Nguoi_ban" PRIMARY KEY  (MA_NGUOI_BAN);


DROP TABLE IF EXISTS KHACH_HANG;
CREATE TABLE KHACH_HANG(
	MA_KH text DEFAULT 'CTMS' || lpad(nextval('AdminId')::text, 4, '0') NOT NULL,
	TAI_KHOAN varchar(50),
	MAT_KHAU varchar(50),
	TEN_KH varchar(50),
	EMAIL varchar(50),
	SDT varchar(10),
	SO_DU int
)
;
ALTER TABLE KHACH_HANG ADD CONSTRAINT "PK_Khach_hang" PRIMARY KEY (MA_KH);
----------------------------------
----------------------------------
DROP TABLE IF EXISTS LOAI_HANG CASCADE;
CREATE TABLE LOAI_HANG(
	MA_LOAI_HANG text DEFAULT '#TY' || lpad(random_string(6)::text, 6) NOT NULL,
	TEN_LOAI_HANG text
);
ALTER TABLE LOAI_HANG ADD CONSTRAINT "PK_LH" PRIMARY KEY (MA_LOAI_HANG);

-----------------------------------
---------------------------------
DROP TABLE IF EXISTS MAT_HANG CASCADE;
CREATE TABLE MAT_HANG(
	MA_MAT_HANG text DEFAULT '#GD' || lpad(random_string(6)::text, 6) NOT NULL,
	MA_LOAI_HANG text ,
	TEN_MAT_HANG text,
	IMG_URL text
);
ALTER TABLE MAT_HANG ADD CONSTRAINT "PK_MH" PRIMARY KEY (MA_MAT_HANG);
ALTER TABLE MAT_HANG ADD CONSTRAINT "FK_MH_LH" FOREIGN KEY (MA_LOAI_HANG) REFERENCES LOAI_HANG(MA_LOAI_HANG);
-----------------------------------
DROP TABLE IF EXISTS DON_HANG CASCADE;
CREATE TABLE DON_HANG(
	MA_DON_HANG text DEFAULT '#ID' || lpad(random_string(6)::text, 6) NOT NULL,
	MA_KHACH_HANG text,
	NGAY_MUA date,
	TRANG_THAI varchar(20) DEFAULT 'CHUA NHAN HOA DON'
);
ALTER TABLE DON_HANG ADD CONSTRAINT "PK_Don_hang" PRIMARY KEY (MA_DON_HANG);


---------------------------------
DROP TABLE IF EXISTS MAT_HANG_TRONG_KHO CASCADE;
CREATE TABLE MAT_HANG_TRONG_KHO(
	MA_MAT_HANG text NOT NULL,
	SO_LUONG int,
	GIA int
);
ALTER TABLE MAT_HANG_TRONG_KHO ADD CONSTRAINT "PK_MH_Kho" PRIMARY KEY (MA_MAT_HANG);
ALTER TABLE MAT_HANG_TRONG_KHO ADD CONSTRAINT "FK_Kho_MH" FOREIGN KEY (MA_MAT_HANG) REFERENCES MAT_HANG(MA_MAT_HANG);
-----------------------------------------------------
DROP TABLE IF EXISTS CHI_TIET_DON_HANG;
CREATE TABLE CHI_TIET_DON_HANG(
	MA_DON_HANG text NOT NULL,
	MA_MAT_HANG text NOT NULL,
	SO_LUONG int,
	GIA_BAN int,
	THANH_TIEN int,
	LOAI varchar(20) DEFAULT 'MAT_HANG'
);
ALTER TABLE CHI_TIET_DON_HANG ADD CONSTRAINT "PK_CT_DH" PRIMARY KEY (MA_DON_HANG,MA_MAT_HANG);
ALTER TABLE CHI_TIET_DON_HANG ADD CONSTRAINT "FK_CTDH_DH" FOREIGN KEY (MA_DON_HANG) REFERENCES DON_HANG(MA_DON_HANG);
ALTER TABLE CHI_TIET_DON_HANG ADD CONSTRAINT "FK_DH_MH" FOREIGN KEY (MA_MAT_HANG) REFERENCES MAT_HANG_TRONG_KHO(MA_MAT_HANG);
------------------------


DROP TABLE IF EXISTS PHIEU_NHAP_KHO CASCADE;
CREATE TABLE PHIEU_NHAP_KHO(
	MA_PHIEU text DEFAULT '#ST' || lpad(random_string(6)::text, 6) NOT NULL,
	MA_NHAP date
);
ALTER TABLE PHIEU_NHAP_KHO ADD CONSTRAINT "PK_Phieu_nhap_kho" PRIMARY KEY (MA_PHIEU);
--------------------------------

DROP TABLE IF EXISTS CHI_TIET_NHAP_KHO;
CREATE TABLE CHI_TIET_NHAP_KHO(
	MA_PHIEU text NOT NULL,
	MA_MAT_HANG text NOT NULL,
	DON_GIA int,
	SO_LUONG int
);
ALTER TABLE CHI_TIET_NHAP_KHO ADD CONSTRAINT "PK_Chi_tiet_nhap_kho" PRIMARY KEY (MA_PHIEU,MA_MAT_HANG);
ALTER TABLE CHI_TIET_NHAP_KHO ADD CONSTRAINT "FK_CT_PNK" FOREIGN KEY (MA_PHIEU) REFERENCES PHIEU_NHAP_KHO(MA_PHIEU);
ALTER TABLE CHI_TIET_NHAP_KHO ADD CONSTRAINT "FK_CT_MH" FOREIGN KEY (MA_MAT_HANG) REFERENCES MAT_HANG(MA_MAT_HANG);

---------------------------------
DROP TABLE IF EXISTS MON_AN CASCADE;
CREATE TABLE MON_AN(
	MA_MON_AN text DEFAULT '#DH' || lpad(random_string(6)::text, 6) NOT NULL,
	TEN_MON_AN text,
	GIA_BAN int
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
INSERT INTO KHACH_HANG(TAI_KHOAN,MAT_KHAU,SDT,EMAIL,SO_DU) VALUES 
('khoamagjk','hjhjhj','079546556','khoacamrank@gmail.com',1500000),
('khanhtrumpc2','hjhjhj','035674032','khanhtrumpc2@gmail.com',1500000),
('hoangkhanhs','hjhjhj','0642138','khang300502@gmail.com',1500000),
('khangchan','hjhjhj','85656554','khoacamrank@gmail.com',1500000);

INSERT INTO DON_HANG(MA_KHACH_HANG,NGAY_MUA) VALUES 
('CTMS0001','2017-03-14'),
('CTMS0002','2017-01-14'),
('CTMS0003','2017-03-14'),
('CTMS0004','2017-03-14');

INSERT INTO NGUOI_BAN(TAI_KHOAN,MAT_KHAU,HO_TEN) VALUES 
('KhanhHEHE','lameo','uhuhu'),
('Khanhasjfh','lameoasfd','uhuhuasdf'),
('Khasfsjfh','laasfsfd','uasdfuasdf');

INSERT INTO LOAI_HANG(TEN_LOAI_HANG) VALUES 
('NUOC UONG'),
('DC HOC TAP'),
('DO AN VAT');
