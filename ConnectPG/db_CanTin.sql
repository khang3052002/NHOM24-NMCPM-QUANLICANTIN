--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

-- Started on 2022-11-18 21:58:32

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16620)
-- Name: CHI_TIET_DON_HANG; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CHI_TIET_DON_HANG" (
    "MA_DON_HANG" integer NOT NULL,
    "MA_MAT_HANG" integer NOT NULL,
    "SO_LUONG" integer,
    "GIA_BAN" integer,
    "THANH_TIEN" integer,
    "LOAI" integer
);


ALTER TABLE public."CHI_TIET_DON_HANG" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16648)
-- Name: CHI_TIET_NHAP_KHO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CHI_TIET_NHAP_KHO" (
    "MA_PHIEU" integer NOT NULL,
    "MA_MAT_HANG" integer NOT NULL,
    "DON_GIA" integer,
    "SO_LUONG" integer
);


ALTER TABLE public."CHI_TIET_NHAP_KHO" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16614)
-- Name: DON_HANG; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."DON_HANG" (
    "MA_DON_HANG" integer NOT NULL,
    "ID_KH" integer,
    "NGAY_MUA" date,
    "TRANG_THAI" boolean,
    "ID_NGUOI_BAN" integer
);


ALTER TABLE public."DON_HANG" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16613)
-- Name: DON_HANG_MA_DON_HANG_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."DON_HANG_MA_DON_HANG_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."DON_HANG_MA_DON_HANG_seq" OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 218
-- Name: DON_HANG_MA_DON_HANG_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."DON_HANG_MA_DON_HANG_seq" OWNED BY public."DON_HANG"."MA_DON_HANG";


--
-- TOC entry 217 (class 1259 OID 16605)
-- Name: KHACH_HANG; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."KHACH_HANG" (
    "MA_KH" integer NOT NULL,
    "TEN_KH" text,
    "SDT" text,
    "USERNAME" text,
    "PASSWORD" text,
    "EMAIL" text
);


ALTER TABLE public."KHACH_HANG" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 16604)
-- Name: KHACH_HANG_MA_KH_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."KHACH_HANG_MA_KH_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."KHACH_HANG_MA_KH_seq" OWNER TO postgres;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 216
-- Name: KHACH_HANG_MA_KH_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."KHACH_HANG_MA_KH_seq" OWNED BY public."KHACH_HANG"."MA_KH";


--
-- TOC entry 225 (class 1259 OID 16640)
-- Name: LOAI_HANG; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LOAI_HANG" (
    "MA_LOAI_HANG" integer NOT NULL,
    "TEN_LOAI_HANG" text
);


ALTER TABLE public."LOAI_HANG" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16639)
-- Name: LOAI_HANG_MA_LOAI_HANG_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LOAI_HANG_MA_LOAI_HANG_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."LOAI_HANG_MA_LOAI_HANG_seq" OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 224
-- Name: LOAI_HANG_MA_LOAI_HANG_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LOAI_HANG_MA_LOAI_HANG_seq" OWNED BY public."LOAI_HANG"."MA_LOAI_HANG";


--
-- TOC entry 223 (class 1259 OID 16631)
-- Name: MAT_HANG; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MAT_HANG" (
    "MA_MAT_HANG" integer NOT NULL,
    "MA_LOAI_HANG" integer,
    "TEN_MAT_HANG" text,
    "IMG_URL" text
);


ALTER TABLE public."MAT_HANG" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16630)
-- Name: MAT_HANG_MA_MAT_HANG_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MAT_HANG_MA_MAT_HANG_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MAT_HANG_MA_MAT_HANG_seq" OWNER TO postgres;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 222
-- Name: MAT_HANG_MA_MAT_HANG_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MAT_HANG_MA_MAT_HANG_seq" OWNED BY public."MAT_HANG"."MA_MAT_HANG";


--
-- TOC entry 221 (class 1259 OID 16625)
-- Name: MAT_HANG_TRONG_KHO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MAT_HANG_TRONG_KHO" (
    "MA_MAT_HANG" integer NOT NULL,
    "SO_LUONG" integer,
    "GIA" integer
);


ALTER TABLE public."MAT_HANG_TRONG_KHO" OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16666)
-- Name: MON_AN; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."MON_AN" (
    "MA_MON_AN" integer NOT NULL,
    "TEN_MON_AN" text,
    "GIA_BAN" integer
);


ALTER TABLE public."MON_AN" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16665)
-- Name: MON_AN_MA_MON_AN_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."MON_AN_MA_MON_AN_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."MON_AN_MA_MON_AN_seq" OWNER TO postgres;

--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 230
-- Name: MON_AN_MA_MON_AN_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."MON_AN_MA_MON_AN_seq" OWNED BY public."MON_AN"."MA_MON_AN";


--
-- TOC entry 215 (class 1259 OID 16596)
-- Name: NGUOI_BAN; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."NGUOI_BAN" (
    "MA_NGUOI_BAN" integer NOT NULL,
    "USERNAME" text,
    "PASSWORD" text,
    "TEN_NG_BAN" text
);


ALTER TABLE public."NGUOI_BAN" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16595)
-- Name: NGUOI_BAN_MA_NGUOI_BAN_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."NGUOI_BAN_MA_NGUOI_BAN_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."NGUOI_BAN_MA_NGUOI_BAN_seq" OWNER TO postgres;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 214
-- Name: NGUOI_BAN_MA_NGUOI_BAN_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."NGUOI_BAN_MA_NGUOI_BAN_seq" OWNED BY public."NGUOI_BAN"."MA_NGUOI_BAN";


--
-- TOC entry 228 (class 1259 OID 16654)
-- Name: PHIEU_NHAP_KHO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PHIEU_NHAP_KHO" (
    "MA_PHIEU" integer NOT NULL,
    "NGAY_NHAP" date,
    "TONG_TIEN" integer
);


ALTER TABLE public."PHIEU_NHAP_KHO" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16653)
-- Name: PHIEU_NHAP_KHO_MA_PHIEU_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PHIEU_NHAP_KHO_MA_PHIEU_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."PHIEU_NHAP_KHO_MA_PHIEU_seq" OWNER TO postgres;

--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 227
-- Name: PHIEU_NHAP_KHO_MA_PHIEU_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PHIEU_NHAP_KHO_MA_PHIEU_seq" OWNED BY public."PHIEU_NHAP_KHO"."MA_PHIEU";


--
-- TOC entry 229 (class 1259 OID 16660)
-- Name: THUC_AN_TRONG_KHO; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."THUC_AN_TRONG_KHO" (
    "MA_MON_AN" integer NOT NULL,
    "SO_LUONG" integer
);


ALTER TABLE public."THUC_AN_TRONG_KHO" OWNER TO postgres;

--
-- TOC entry 3221 (class 2604 OID 16617)
-- Name: DON_HANG MA_DON_HANG; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DON_HANG" ALTER COLUMN "MA_DON_HANG" SET DEFAULT nextval('public."DON_HANG_MA_DON_HANG_seq"'::regclass);


--
-- TOC entry 3220 (class 2604 OID 16608)
-- Name: KHACH_HANG MA_KH; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."KHACH_HANG" ALTER COLUMN "MA_KH" SET DEFAULT nextval('public."KHACH_HANG_MA_KH_seq"'::regclass);


--
-- TOC entry 3223 (class 2604 OID 16643)
-- Name: LOAI_HANG MA_LOAI_HANG; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LOAI_HANG" ALTER COLUMN "MA_LOAI_HANG" SET DEFAULT nextval('public."LOAI_HANG_MA_LOAI_HANG_seq"'::regclass);


--
-- TOC entry 3222 (class 2604 OID 16634)
-- Name: MAT_HANG MA_MAT_HANG; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MAT_HANG" ALTER COLUMN "MA_MAT_HANG" SET DEFAULT nextval('public."MAT_HANG_MA_MAT_HANG_seq"'::regclass);


--
-- TOC entry 3225 (class 2604 OID 16669)
-- Name: MON_AN MA_MON_AN; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MON_AN" ALTER COLUMN "MA_MON_AN" SET DEFAULT nextval('public."MON_AN_MA_MON_AN_seq"'::regclass);


--
-- TOC entry 3219 (class 2604 OID 16599)
-- Name: NGUOI_BAN MA_NGUOI_BAN; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NGUOI_BAN" ALTER COLUMN "MA_NGUOI_BAN" SET DEFAULT nextval('public."NGUOI_BAN_MA_NGUOI_BAN_seq"'::regclass);


--
-- TOC entry 3224 (class 2604 OID 16657)
-- Name: PHIEU_NHAP_KHO MA_PHIEU; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PHIEU_NHAP_KHO" ALTER COLUMN "MA_PHIEU" SET DEFAULT nextval('public."PHIEU_NHAP_KHO_MA_PHIEU_seq"'::regclass);


--
-- TOC entry 3235 (class 2606 OID 16624)
-- Name: CHI_TIET_DON_HANG CHI_TIET_DON_HANG_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CHI_TIET_DON_HANG"
    ADD CONSTRAINT "CHI_TIET_DON_HANG_pkey" PRIMARY KEY ("MA_DON_HANG", "MA_MAT_HANG");


--
-- TOC entry 3245 (class 2606 OID 16652)
-- Name: CHI_TIET_NHAP_KHO CHI_TIET_NHAP_KHO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CHI_TIET_NHAP_KHO"
    ADD CONSTRAINT "CHI_TIET_NHAP_KHO_pkey" PRIMARY KEY ("MA_PHIEU", "MA_MAT_HANG");


--
-- TOC entry 3231 (class 2606 OID 16619)
-- Name: DON_HANG DON_HANG_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DON_HANG"
    ADD CONSTRAINT "DON_HANG_pkey" PRIMARY KEY ("MA_DON_HANG");


--
-- TOC entry 3229 (class 2606 OID 16612)
-- Name: KHACH_HANG KHACH_HANG_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."KHACH_HANG"
    ADD CONSTRAINT "KHACH_HANG_pkey" PRIMARY KEY ("MA_KH");


--
-- TOC entry 3243 (class 2606 OID 16647)
-- Name: LOAI_HANG LOAI_HANG_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LOAI_HANG"
    ADD CONSTRAINT "LOAI_HANG_pkey" PRIMARY KEY ("MA_LOAI_HANG");


--
-- TOC entry 3239 (class 2606 OID 16629)
-- Name: MAT_HANG_TRONG_KHO MAT_HANG_TRONG_KHO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MAT_HANG_TRONG_KHO"
    ADD CONSTRAINT "MAT_HANG_TRONG_KHO_pkey" PRIMARY KEY ("MA_MAT_HANG");


--
-- TOC entry 3241 (class 2606 OID 16638)
-- Name: MAT_HANG MAT_HANG_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MAT_HANG"
    ADD CONSTRAINT "MAT_HANG_pkey" PRIMARY KEY ("MA_MAT_HANG");


--
-- TOC entry 3252 (class 2606 OID 16673)
-- Name: MON_AN MON_AN_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MON_AN"
    ADD CONSTRAINT "MON_AN_pkey" PRIMARY KEY ("MA_MON_AN");


--
-- TOC entry 3227 (class 2606 OID 16603)
-- Name: NGUOI_BAN NGUOI_BAN_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."NGUOI_BAN"
    ADD CONSTRAINT "NGUOI_BAN_pkey" PRIMARY KEY ("MA_NGUOI_BAN");


--
-- TOC entry 3247 (class 2606 OID 16659)
-- Name: PHIEU_NHAP_KHO PHIEU_NHAP_KHO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PHIEU_NHAP_KHO"
    ADD CONSTRAINT "PHIEU_NHAP_KHO_pkey" PRIMARY KEY ("MA_PHIEU");


--
-- TOC entry 3249 (class 2606 OID 16664)
-- Name: THUC_AN_TRONG_KHO THUC_AN_TRONG_KHO_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."THUC_AN_TRONG_KHO"
    ADD CONSTRAINT "THUC_AN_TRONG_KHO_pkey" PRIMARY KEY ("MA_MON_AN");


--
-- TOC entry 3250 (class 1259 OID 16722)
-- Name: fki_ t; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_ t" ON public."THUC_AN_TRONG_KHO" USING btree ("MA_MON_AN");


--
-- TOC entry 3236 (class 1259 OID 16716)
-- Name: fki_CTDH_THUC_AN_KHO_MA_MON_AN_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_CTDH_THUC_AN_KHO_MA_MON_AN_fkey" ON public."CHI_TIET_DON_HANG" USING btree ("MA_MAT_HANG");


--
-- TOC entry 3237 (class 1259 OID 16685)
-- Name: fki_c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_c ON public."CHI_TIET_DON_HANG" USING btree ("MA_DON_HANG");


--
-- TOC entry 3232 (class 1259 OID 16728)
-- Name: fki_d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_d ON public."DON_HANG" USING btree ("ID_NGUOI_BAN");


--
-- TOC entry 3233 (class 1259 OID 16679)
-- Name: fki_m; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_m ON public."DON_HANG" USING btree ("ID_KH");


--
-- TOC entry 3255 (class 2606 OID 16680)
-- Name: CHI_TIET_DON_HANG CTDH_DON_HANG_MA_DON_HANG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CHI_TIET_DON_HANG"
    ADD CONSTRAINT "CTDH_DON_HANG_MA_DON_HANG_fkey" FOREIGN KEY ("MA_DON_HANG") REFERENCES public."DON_HANG"("MA_DON_HANG") NOT VALID;


--
-- TOC entry 3256 (class 2606 OID 16686)
-- Name: CHI_TIET_DON_HANG CTDH_MHTK_MA_MAT_HANG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CHI_TIET_DON_HANG"
    ADD CONSTRAINT "CTDH_MHTK_MA_MAT_HANG_fkey" FOREIGN KEY ("MA_MAT_HANG") REFERENCES public."MAT_HANG_TRONG_KHO"("MA_MAT_HANG") NOT VALID;


--
-- TOC entry 3257 (class 2606 OID 16711)
-- Name: CHI_TIET_DON_HANG CTDH_THUC_AN_KHO_MA_MON_AN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CHI_TIET_DON_HANG"
    ADD CONSTRAINT "CTDH_THUC_AN_KHO_MA_MON_AN_fkey" FOREIGN KEY ("MA_MAT_HANG") REFERENCES public."THUC_AN_TRONG_KHO"("MA_MON_AN") NOT VALID;


--
-- TOC entry 3260 (class 2606 OID 16701)
-- Name: CHI_TIET_NHAP_KHO CTNK_MAT_HANG_MA_MAT_HANG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CHI_TIET_NHAP_KHO"
    ADD CONSTRAINT "CTNK_MAT_HANG_MA_MAT_HANG_fkey" FOREIGN KEY ("MA_MAT_HANG") REFERENCES public."MAT_HANG"("MA_MAT_HANG") NOT VALID;


--
-- TOC entry 3261 (class 2606 OID 16706)
-- Name: CHI_TIET_NHAP_KHO CTNK_PHIEU_NHAP_KHO_MA_PHIEU; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CHI_TIET_NHAP_KHO"
    ADD CONSTRAINT "CTNK_PHIEU_NHAP_KHO_MA_PHIEU" FOREIGN KEY ("MA_PHIEU") REFERENCES public."PHIEU_NHAP_KHO"("MA_PHIEU") NOT VALID;


--
-- TOC entry 3253 (class 2606 OID 16674)
-- Name: DON_HANG DON_HANG_KHACH_HANG_ID_KH_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DON_HANG"
    ADD CONSTRAINT "DON_HANG_KHACH_HANG_ID_KH_fkey" FOREIGN KEY ("ID_KH") REFERENCES public."KHACH_HANG"("MA_KH") NOT VALID;


--
-- TOC entry 3254 (class 2606 OID 16723)
-- Name: DON_HANG DON_HANG_NGUOI_BAN_ID_NGBAN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."DON_HANG"
    ADD CONSTRAINT "DON_HANG_NGUOI_BAN_ID_NGBAN_fkey" FOREIGN KEY ("ID_NGUOI_BAN") REFERENCES public."NGUOI_BAN"("MA_NGUOI_BAN") NOT VALID;


--
-- TOC entry 3259 (class 2606 OID 16696)
-- Name: MAT_HANG MAT_HANG_LOAI_HANG_MA_LOAI_HANG; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MAT_HANG"
    ADD CONSTRAINT "MAT_HANG_LOAI_HANG_MA_LOAI_HANG" FOREIGN KEY ("MA_LOAI_HANG") REFERENCES public."LOAI_HANG"("MA_LOAI_HANG") NOT VALID;


--
-- TOC entry 3258 (class 2606 OID 16691)
-- Name: MAT_HANG_TRONG_KHO MHTK_MAT_HANG_MA_MAT_HANG_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."MAT_HANG_TRONG_KHO"
    ADD CONSTRAINT "MHTK_MAT_HANG_MA_MAT_HANG_fkey" FOREIGN KEY ("MA_MAT_HANG") REFERENCES public."MAT_HANG"("MA_MAT_HANG") NOT VALID;


--
-- TOC entry 3262 (class 2606 OID 16717)
-- Name: THUC_AN_TRONG_KHO THUC_AN_KHO_MON_AN_MA_MON_AN_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."THUC_AN_TRONG_KHO"
    ADD CONSTRAINT "THUC_AN_KHO_MON_AN_MA_MON_AN_fkey" FOREIGN KEY ("MA_MON_AN") REFERENCES public."MON_AN"("MA_MON_AN") NOT VALID;


-- Completed on 2022-11-18 21:58:33

--
-- PostgreSQL database dump complete
--

