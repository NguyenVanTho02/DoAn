-- Records of 
Insert into Genre(GenreName) values(N'Hành Động');
Insert into Genre(GenreName) values(N'Phiêu Lưu');
Insert into Genre(GenreName) values(N'Kinh Dị');
Insert into Genre(GenreName) values(N'Hoạt Hình');
Insert into Genre(GenreName) values(N'Khoa Học Viễn Tưởng');
Insert into Genre(GenreName) values(N'Hài');
Insert into Genre(GenreName) values(N'Tình Cảm');

-- Records of Cites

INSERT INTO Cities(CityName) VALUES
(N'Hà Nội'), (N'Hồ Chí Minh'), (N'Đà Nẵng'), (N'Hải Phòng'), (N'Cần Thơ'), (N'An Giang'), (N'Bà Rịa - Vũng Tàu'),
(N'Bắc Giang'), (N'Bắc Kạn'), (N'Bạc Liêu'), (N'Bắc Ninh'), (N'Bến Tre'), (N'Bình Định'), (N'Bình Dương'), 
(N'Bình Phước'), (N'Bình Thuận'), (N'Cà Mau'), (N'Cao Bằng'), (N'Đắk Lắk'), (N'Đắk Nông'), (N'Điện Biên'), 
(N'Đồng Nai'), (N'Đồng Tháp'), (N'Gia Lai'), (N'Hà Giang'), (N'Hà Nam'), (N'Hà Tĩnh'), (N'Hải Dương'), 
(N'Hậu Giang'), (N'Hòa Bình'), (N'Hưng Yên'), (N'Khánh Hòa'), (N'Kiên Giang'), (N'Kon Tum'), (N'Lai Châu'), 
(N'Lâm Đồng'), (N'Lạng Sơn'), (N'Lào Cai'), (N'Long An'), (N'Nam Định'), (N'Nghệ An'), (N'Ninh Bình'), 
(N'Ninh Thuận'), (N'Phú Thọ'), (N'Quảng Bình'), (N'Quảng Nam'), (N'Quảng Ngãi'), (N'Quảng Ninh'), 
(N'Quảng Trị'), (N'Sóc Trăng'), (N'Sơn La'), (N'Tây Ninh'), (N'Thái Bình'), (N'Thái Nguyên'), (N'Thanh Hóa'), 
(N'Thừa Thiên - Huế'), (N'Tiền Giang'), (N'Trà Vinh'), (N'Tuyên Quang'), (N'Vĩnh Long'), 
(N'Vĩnh Phúc'), (N'Yên Bái'), (N'Phú Yên');

DELETE Cities

-- Records of Cinema

insert into Cinemas(CinemaName,CinemaAddress,CityID) values (N'MD Cầu giấy',N'Số 3 Cầu giấy',1);
insert into Cinemas(CinemaName,CinemaAddress,CityID) values (N'MD Mỹ Đình',N'Số 4 Mỹ Đình',1); 
insert into Cinemas(CinemaName,CinemaAddress,CityID) values (N'MD Thanh Hóa',N'Số 4 Mỹ Đình',55);
-- Record of theater 
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P1',1,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P2',1,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P3',1,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P1',2,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P2',2,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P2',2,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P1',3,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P2',3,50);
insert into Theaters(TheaterName,CinemaID,QtySeat) values (N'P3',3,50);

--
CREATE OR ALTER PROCEDURE InsertSeat
    @qtySeat INT,
    @theaterID INT
AS
BEGIN
    DECLARE @i INT = 1;
    WHILE @i <= @qtySeat
    BEGIN
        INSERT INTO Seats (TheaterID) 
        VALUES (@theaterID);
        SET @i = @i + 1;
    END
END;

EXEC InsertSeat @qtySeat = 10, @theaterID = 1;

update UserRoles set RoleId = '314be78a-03cd-404e-a6c5-94ddb33ac4b4' where UserId = '8c2e8138-80c9-48ee-a7c7-ac58c83ef2b4'

