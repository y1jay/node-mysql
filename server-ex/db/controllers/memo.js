// @desc    모든 정보를 다 조회
// @route   GET /api/v1/memo
// @access  Public
exports.getmemo = (req, res, next) => {
  res.status(200).json({ title: "select", coment: "select" });
};

// @desc    새로운 정보를 insert
// @route   POST /api/v1/memo/
// @access  Public

exports.creatememo = (req, res, next) => {
  res.status(200).json(
    {
      title: "에베베베",
      coment: "알랄라라",
    },
    { title: "올랄라라", coment: "이렐레렐" }
  );
};

// @desc    기존id에 있는 정보를 업데이트
// @route   PUT /api/v1/memo/id
// @access  Public

exports.updatememo = (req, res, next) => {
  res.status(200).json({
    title: true,
    coment: `Update memo${req.params.id}`,
  });
};

// @desc    기존id에 있는 정보를 삭제
// @route   DELETE /api/v1/memo/id
// @access  Public

exports.deleltememo = (reqm, res, next) => {
  res.status(200).json({
    title: true,
    coment: `Delete memo ${req.params.id}`,
  });
};

// exports == 함수별로 exports한것이다 (공유)
