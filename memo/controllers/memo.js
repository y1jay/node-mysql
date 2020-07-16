// @desc    모든 정보를 다 조회
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getmemos = (req, res, next) => {
  res
    .status(200)
    .json({ succese: true, msg: "Show all memos", middleware: req.hello });
};

// @desc    새로운 정보를 insert
// @route   POST /api/v1/bootcamps/
// @access  Public

exports.creatememo = (req, res, next) => {
  res.status(200).json({
    succese: true,
    msg: "Create new memo",
  });
};

// @desc    기존에 있는 정보를 업데이트
// @route   PUT /api/v1/bootcamps/id
// @access  Public

exports.updatememo = (req, res, next) => {
  res.status(200).json({
    succese: true,
    msg: `Update memo${(req.params, id)}`,
  });
};

// @desc    기존id에 있는 정보를 삭제
// @route   DELETE /api/v1/bootcamps/id
// @access  Public

exports.deleltememo = (reqm, res, next) => {
  res.status(200).json({
    succese: true,
    msg: `Delete memo ${req.params.id}`,
  });
};

// exports == 함수별로 exports한것이다 (공유)
