// @desc    모든 정보를 다 조회
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res
    .status(200)
    .json({ succese: true, msg: "Show all bootcamps", middleware: req.hello });
};

// @desc    해당 id의 정보 조회
// @route   GET /api/v1/bootcamps/id
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({
    succese: true,
    msg: `Show  bootcmaps${req.params.id}번`,
  });
};

// @desc    새로운 정보를 insert
// @route   POST /api/v1/bootcamps/
// @access  Public

exports.createBootcamp = (req, res, next) => {
  res.status(200).json({
    succese: true,
    msg: "Create new bootcamp",
  });
};

// @desc    기존id에 있는 정보를 업데이트
// @route   PUT /api/v1/bootcamps/id
// @access  Public

exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({
    succese: true,
    msg: `Update bootcamp${req.params.id}`,
  });
};

// @desc    기존id에 있는 정보를 삭제
// @route   DELETE /api/v1/bootcamps/id
// @access  Public

exports.delelteBootcamp = (reqm, res, next) => {
  res.status(200).json({
    succese: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
};

// exports == 함수별로 exports한것이다 (공유)
