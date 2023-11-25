export const confirmEmailForm = (userData) => {
  return `<div class="form-confirm-email" style="width: 990px">
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
      style="width: 36px; height: 36px"
    />
    <div
      class="text"
      style="font-size: 19px;
      margin: auto 0;
      margin-left: 10px;
      color: #1877f2;"
    >
      Action required: Confirm your Facebook account
    </div>
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
      You recently registered for Facebook. To complete your Facebook
      registration, please confirm your account.
    </div>
    <div class="confirm-link" style="padding: 16px 16px 16px 0">
      <a
        href="http://localhost:5000/api/v1/auth/confirm/token/${userData.email}/${userData.confirmationToken}"
        style="
          background-color: #1877f2;
          padding: 12px;
          font-size: 15px;
          color: #fff;
          font-weight: 600;
          border-radius: 6px;
          text-decoration: none;
        "
        >Confirm Your Account</a
      >
    </div>
    <div
      class="other-text"
      style="padding: 16px 16px 16px 0; font-size: 17px; color: #141823"
    >
      You may be asked to enter this confirmation code:
    </div>
    <div
      class="verify-code"
      style="
        width: 100%;
        height: 42px;
        text-align: center;
      "
    >
      <div
        class="code-content"
        style="
        display: inline-block;
        width: fit-content;
        border: 1px solid #cccccc;
        padding: 8px;
        background-color: #f2f2f2;
        font-size: 19px;
        color: #141823;
        text-align: left;
        "
      >
        FB-<span class="code">${userData.verificationCode.code}</span>
      </div>
    </div>
    <div
      class="sub-info"
      style="
        padding: 16px 0;
        font-size: 15px;
        color: #898f9c;
        border-bottom: 1px solid #e5e5e5;
      "
    >
      Facebook helps you communicate and stay in touch with all of your
      friends. Once you've joined Facebook, you'll be able to share photos,
      plan events and more.
    </div>
    <div
      class="more-info"
      style="padding: 16px 0; font-size: 11px; color: #aaaaaa"
    >
      <div class="detail">
        This message was sent to
        <span class="inside-detail" style="color: #1874e4;">${userData.email}</span> at
        your request.
      </div>
      <div class="detail">
        Meta Platforms, Inc., Attention: Community Support, 1 Meta Way,
        Menlo Park, CA 94025
      </div>
      <div class="detail">
        To help keep your account secure, please don't forward this email.
        <span class="inside-detail" style="color: #1874e4;">Learn more</span>
      </div>
    </div>
  </div>
</div>`;
};
