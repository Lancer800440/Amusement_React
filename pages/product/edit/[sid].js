import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AB_GET_ONE, AB_EDIT_ONE } from "@/component/product-const";
import { Layout } from "@/component/Layout";

export default function ABEdit() {
  const [myForm, setMyForm] = useState({
    sid: "",
    name: "",
    email: "",
    mobile: "",
    birthday: "",
    address: "",
  });
  const router = useRouter();
  useEffect(() => {
    const sid = +router.query.sid;
    console.log({ sid, raw: router.query.sid });
    // 有抓到值時
    if (router.query.sid !== undefined) {
      if (!sid) {
        router.push("/address-book"); // sid 是 NaN 就跳到列表頁
      } else {
        // 取得單筆資料
        fetch(AB_GET_ONE + "/" + sid)
          .then((r) => r.json())
          .then((data) => {
            if (!data.success) {
              router.push("/address-book"); // 沒拿到資料, 跳到列表頁
            } else {
              setMyForm({ ...data.row });
            }
          })
          .catch((ex) => console.log(ex));
      }
    }
  }, [router.query.sid]);

  const [displayInfo, setDisplayInfo] = useState(""); // "", "succ", "fail"

  const changeHandler = (e) => {
    const { name, id, value } = e.target;
    console.log({ name, id, value });
    setDisplayInfo("");
    setMyForm({ ...myForm, [id]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const mySend = {...myForm};
    delete mySend.created_at

    // TODO: 檢查各個欄位的資料

    const r = await fetch(AB_EDIT_ONE + "/" + myForm.sid, {
      method: "PUT",
      body: JSON.stringify(mySend),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await r.json();
    if (responseData.success) {
      setDisplayInfo("succ");
    } else {
      setDisplayInfo("fail");
    }
  };

  return (
    <>
      <Layout>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">新增資料</h5>
                <form name="form1" onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={myForm.name}
                      onChange={changeHandler}
                    />
                    <div className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={myForm.email}
                      onChange={changeHandler}
                    />
                    <div className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      mobile
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      name="mobile"
                      value={myForm.mobile}
                      onChange={changeHandler}
                    />
                    <div className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="birthday" className="form-label">
                      birthday
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthday"
                      name="birthday"
                      value={myForm.birthday}
                      onChange={changeHandler}
                    />
                    <div className="form-text"></div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      address
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      name="address"
                      cols="30"
                      rows="3"
                      value={myForm.address}
                      onChange={changeHandler}
                    ></textarea>
                  </div>
                  {displayInfo ? (
                    displayInfo === "succ" ? (
                      <div class="alert alert-success" role="alert">
                        資料修改成功
                      </div>
                    ) : (
                      <div class="alert alert-danger" role="alert">
                        資料沒有修改!!!
                      </div>
                    )
                  ) : null}

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
