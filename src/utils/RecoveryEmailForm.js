export const recoveryEmailForm = (userData) => {
  return `<div class="form-confirm-email" style="width: 540px">
  <div
    class="form-confirm-header"
    style="
      width: 100%;
      display: flex;
      padding: 16px;
      border-bottom: 1px solid #e5e5e5;
    "
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
      alt="logo"
      class="logo"
      style="width: 32px; height: 32px"
    />
  </div>
  <div class="form-confirm-body" style="padding: 16px">
    <div
      class="hi-text"
      style="
        padding: 16px;
        padding-left: 0;
        font-size: 17px;
        color: #141823;
      "
    >
      Hi ${userData.firstName},
    </div>
    <div
      class="info-text"
      style="padding: 0 16px 16px 0; font-size: 17px; color: #141823"
    >
      We received a request to reset your Facebook password. Enter the
      following password reset code:
    </div>
    <div class="verify-code" style="width: 100%; margin: 16px 0">
      <div
        class="code-content"
        style="
          width: fit-content;
          border: 1px solid #cccccc;
          padding: 14px 32px;
          background-color: #e7f3ff;
          border: 1px solid #1877f2;
          border-radius: 6px;
          font-size: 19px;
          font-weight: bold;
          color: #141823;
        "
      >
        ${userData.recoveryCode}
      </div>
    </div>
    <div
      class="sub-info"
      style="padding: 16px 0; font-size: 17px; color: #141823"
    >
      Alternatively, you can directly change your password.
    </div>
    <button
      class="change-password-btn"
      style="
        cursor: pointer;
        width: 100%;
        height: 40px;
        margin: 16px 0;
        font-size: 17px;
        font-weight: 600;
        border: none;
        outline: none;
        border-radius: 6px;
        background-color: #1877f2;
        color: #fff;
      "
    >
      Change Password
    </button>
    <div
      class="text"
      style="padding: 16px 0; border-bottom: 1px solid #e5e5e5"
    >
      <div class="text-1" style="font-size: 17px; font-weight: bold">
        Didn't request this change?
      </div>
      <div class="text-2" style="font-size: 17px">
        If you didn't request a new password,
        <span class="highlight" style="color: #1874e4; cursor: pointer"
          >let us know.</span
        >
      </div>
    </div>
    <div
      class="more-info"
      style="padding: 16px 0; font-size: 11px; color: #aaaaaa"
    >
      <div class="detail">
        This message was sent to
        <span class="inside-detail" style="color: #1874e4">${userData.email}</span>
        at your request.
      </div>
      <div class="detail">
        Meta Platforms, Inc., Attention: Community Support, 1 Meta Way,
        Menlo Park, CA 94025
      </div>
      <div class="detail">
        To help keep your account secure, please don't forward this email.
        <span class="inside-detail" style="color: #1874e4">Learn more</span>
      </div>
    </div>
  </div>
</div>`;
};
