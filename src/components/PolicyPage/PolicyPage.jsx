import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "./policyPage.scss";

const PolicyPage = () => {
  const refs = {
    termsOfUse: useRef(),
    safetyAndSecurity: useRef(),
    dataPrivacy: useRef(),
    credits: useRef(),
  };

  let { hash } = useLocation();
  hash = hash.replace("#", "");

  useEffect(() => {
    if (hash) refs[hash].current.scrollIntoView({ block: "center" });
  }, [hash]);

  return (
    <div className="policy-page">
      <div className="policy-page__policy-section-and-toc">
        <section aria-label="policies" className="policy-page__policy-section">
          <header>
            <h1>Policies</h1>
          </header>

          <main>
            <section
              aria-label="terms of use"
              id="termsOfUse"
              ref={refs.termsOfUse}
            >
              <h2>Terms of Use</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                quos aliquid itaque nulla maxime voluptas, ratione quis
                doloremque asperiores eius voluptate numquam veritatis, cum
                aperiam impedit voluptatibus inventore est commodi magnam sit ut
                possimus. Quod eaque quidem, tempore sequi facere magni
                quibusdam sint! Et, necessitatibus deleniti facilis sint natus
                minima iste accusantium nemo, exercitationem ullam ex neque
                officia aperiam quas. Recusandae excepturi est minus magnam et
                iste esse facere commodi qui ad vitae maxime totam, deserunt
                nesciunt animi eum suscipit consequuntur! Aliquid quam quibusdam
                exercitationem incidunt voluptas? Reiciendis rerum quibusdam
                inventore esse fuga, excepturi eveniet tenetur repellendus
                perferendis ab, minus, iusto sed vero a molestiae eum soluta?
                Dicta, a fugit. Facere error fugit reprehenderit sed quibusdam
                provident illo dignissimos iusto, doloremque, nihil veritatis!
                Error natus architecto, optio iusto deserunt doloribus porro
                itaque ducimus, commodi perspiciatis in ab quod autem molestiae
                officiis nesciunt, quisquam recusandae earum. Molestiae tenetur
                aliquid ex voluptatem labore doloremque non inventore dolorum
                beatae ea nobis sint cum modi illum eum libero ullam
                consequuntur enim, possimus explicabo quam facilis accusamus.
                Unde laborum, expedita rerum accusamus cumque voluptates vero
                nobis, laudantium voluptatum, voluptate necessitatibus
                distinctio neque. Quae, totam maiores iure non mollitia debitis
                culpa quisquam vero illum explicabo animi distinctio sed, est
                accusantium itaque qui, illo consectetur nulla eum rem veniam
                inventore odit! Iure, molestiae deleniti. Libero, animi eos
                excepturi enim voluptas nemo esse accusamus, a nihil modi
                cupiditate, voluptatem quae eligendi unde molestias ut
                voluptatum maiores dicta alias beatae architecto incidunt. Error
                totam eaque cumque quo perferendis explicabo excepturi sit,
                quaerat magnam, atque soluta sapiente, fugiat eveniet. Nostrum
                ipsa ad ab. Impedit iste ullam obcaecati nulla! Mollitia
                accusamus, sint facere iusto ad recusandae quia, pariatur minus
                reprehenderit dignissimos delectus voluptate quisquam dolores
                assumenda beatae expedita ut, ducimus tempora quos. Aperiam
                consequuntur, provident sed alias harum voluptas odio minus, ad
                modi unde recusandae repellat quaerat praesentium veritatis! At
                animi quisquam iusto necessitatibus, nam optio quos, officiis
                labore illo suscipit rerum mollitia consequatur aut asperiores.
                Minima adipisci repudiandae quod voluptatum eos error quas,
                nihil itaque quaerat ipsum fugit, non nostrum. Labore
                consequatur quidem ullam aut incidunt minus ipsa voluptate,
                exercitationem blanditiis, laboriosam deleniti neque non. Cumque
                iusto sint tempore excepturi, enim vitae modi, laboriosam maxime
                impedit iste fuga, cupiditate nesciunt vero asperiores
                architecto natus deserunt perspiciatis eos ducimus? Distinctio
                ratione accusamus nobis obcaecati quaerat beatae quae? Quis
                voluptate facilis laudantium, eaque quam, eligendi praesentium
                et velit debitis tempora consequuntur accusantium harum suscipit
                natus explicabo sit atque aliquam laborum quia quaerat. Eum
                facere enim mollitia quo similique ex explicabo laboriosam
                commodi id aspernatur, esse sequi quam, libero ipsam maxime!
                Autem amet, neque odio accusantium minus fuga id repudiandae
                nihil minima excepturi ea blanditiis tempore illo adipisci culpa
                dolore eius qui eum, aspernatur fugiat? Tempore adipisci est
                doloribus saepe similique, facere assumenda, mollitia dolor
                officia illo temporibus? Molestiae maxime vel sit et! Architecto
                magnam corporis, eaque, maiores alias ad commodi accusantium
                repellat qui sit eligendi vel exercitationem nam, repudiandae
                ducimus molestias itaque dignissimos! Voluptatibus, magnam sint
                nemo nulla expedita quo minus assumenda!
              </p>
            </section>
            <section
              aria-label="safety and security"
              id="safetyAndSecurity"
              ref={refs.safetyAndSecurity}
            >
              <h2>Safety and Security</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                quos aliquid itaque nulla maxime voluptas, ratione quis
                doloremque asperiores eius voluptate numquam veritatis, cum
                aperiam impedit voluptatibus inventore est commodi magnam sit ut
                possimus. Quod eaque quidem, tempore sequi facere magni
                quibusdam sint! Et, necessitatibus deleniti facilis sint natus
                minima iste accusantium nemo, exercitationem ullam ex neque
                officia aperiam quas. Recusandae excepturi est minus magnam et
                iste esse facere commodi qui ad vitae maxime totam, deserunt
                nesciunt animi eum suscipit consequuntur! Aliquid quam quibusdam
                exercitationem incidunt voluptas? Reiciendis rerum quibusdam
                inventore esse fuga, excepturi eveniet tenetur repellendus
                perferendis ab, minus, iusto sed vero a molestiae eum soluta?
                Dicta, a fugit. Facere error fugit reprehenderit sed quibusdam
                provident illo dignissimos iusto, doloremque, nihil veritatis!
                Error natus architecto, optio iusto deserunt doloribus porro
                itaque ducimus, commodi perspiciatis in ab quod autem molestiae
                officiis nesciunt, quisquam recusandae earum. Molestiae tenetur
                aliquid ex voluptatem labore doloremque non inventore dolorum
                beatae ea nobis sint cum modi illum eum libero ullam
                consequuntur enim, possimus explicabo quam facilis accusamus.
                Unde laborum, expedita rerum accusamus cumque voluptates vero
                nobis, laudantium voluptatum, voluptate necessitatibus
                distinctio neque. Quae, totam maiores iure non mollitia debitis
                culpa quisquam vero illum explicabo animi distinctio sed, est
                accusantium itaque qui, illo consectetur nulla eum rem veniam
                inventore odit! Iure, molestiae deleniti. Libero, animi eos
                excepturi enim voluptas nemo esse accusamus, a nihil modi
                cupiditate, voluptatem quae eligendi unde molestias ut
                voluptatum maiores dicta alias beatae architecto incidunt. Error
                totam eaque cumque quo perferendis explicabo excepturi sit,
                quaerat magnam, atque soluta sapiente, fugiat eveniet. Nostrum
                ipsa ad ab. Impedit iste ullam obcaecati nulla! Mollitia
                accusamus, sint facere iusto ad recusandae quia, pariatur minus
                reprehenderit dignissimos delectus voluptate quisquam dolores
                assumenda beatae expedita ut, ducimus tempora quos. Aperiam
                consequuntur, provident sed alias harum voluptas odio minus, ad
                modi unde recusandae repellat quaerat praesentium veritatis! At
                animi quisquam iusto necessitatibus, nam optio quos, officiis
                labore illo suscipit rerum mollitia consequatur aut asperiores.
                Minima adipisci repudiandae quod voluptatum eos error quas,
                nihil itaque quaerat ipsum fugit, non nostrum. Labore
                consequatur quidem ullam aut incidunt minus ipsa voluptate,
                exercitationem blanditiis, laboriosam deleniti neque non. Cumque
                iusto sint tempore excepturi, enim vitae modi, laboriosam maxime
                impedit iste fuga, cupiditate nesciunt vero asperiores
                architecto natus deserunt perspiciatis eos ducimus? Distinctio
                ratione accusamus nobis obcaecati quaerat beatae quae? Quis
                voluptate facilis laudantium, eaque quam, eligendi praesentium
                et velit debitis tempora consequuntur accusantium harum suscipit
                natus explicabo sit atque aliquam laborum quia quaerat. Eum
                facere enim mollitia quo similique ex explicabo laboriosam
                commodi id aspernatur, esse sequi quam, libero ipsam maxime!
                Autem amet, neque odio accusantium minus fuga id repudiandae
                nihil minima excepturi ea blanditiis tempore illo adipisci culpa
                dolore eius qui eum, aspernatur fugiat? Tempore adipisci est
                doloribus saepe similique, facere assumenda, mollitia dolor
                officia illo temporibus? Molestiae maxime vel sit et! Architecto
                magnam corporis, eaque, maiores alias ad commodi accusantium
                repellat qui sit eligendi vel exercitationem nam, repudiandae
                ducimus molestias itaque dignissimos! Voluptatibus, magnam sint
                nemo nulla expedita quo minus assumenda!
              </p>
            </section>
            <section
              aria-label="data privacy"
              id="dataPrivacy"
              ref={refs.dataPrivacy}
            >
              <h2>Data Privacy</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
                quos aliquid itaque nulla maxime voluptas, ratione quis
                doloremque asperiores eius voluptate numquam veritatis, cum
                aperiam impedit voluptatibus inventore est commodi magnam sit ut
                possimus. Quod eaque quidem, tempore sequi facere magni
                quibusdam sint! Et, necessitatibus deleniti facilis sint natus
                minima iste accusantium nemo, exercitationem ullam ex neque
                officia aperiam quas. Recusandae excepturi est minus magnam et
                iste esse facere commodi qui ad vitae maxime totam, deserunt
                nesciunt animi eum suscipit consequuntur! Aliquid quam quibusdam
                exercitationem incidunt voluptas? Reiciendis rerum quibusdam
                inventore esse fuga, excepturi eveniet tenetur repellendus
                perferendis ab, minus, iusto sed vero a molestiae eum soluta?
                Dicta, a fugit. Facere error fugit reprehenderit sed quibusdam
                provident illo dignissimos iusto, doloremque, nihil veritatis!
                Error natus architecto, optio iusto deserunt doloribus porro
                itaque ducimus, commodi perspiciatis in ab quod autem molestiae
                officiis nesciunt, quisquam recusandae earum. Molestiae tenetur
                aliquid ex voluptatem labore doloremque non inventore dolorum
                beatae ea nobis sint cum modi illum eum libero ullam
                consequuntur enim, possimus explicabo quam facilis accusamus.
                Unde laborum, expedita rerum accusamus cumque voluptates vero
                nobis, laudantium voluptatum, voluptate necessitatibus
                distinctio neque. Quae, totam maiores iure non mollitia debitis
                culpa quisquam vero illum explicabo animi distinctio sed, est
                accusantium itaque qui, illo consectetur nulla eum rem veniam
                inventore odit! Iure, molestiae deleniti. Libero, animi eos
                excepturi enim voluptas nemo esse accusamus, a nihil modi
                cupiditate, voluptatem quae eligendi unde molestias ut
                voluptatum maiores dicta alias beatae architecto incidunt. Error
                totam eaque cumque quo perferendis explicabo excepturi sit,
                quaerat magnam, atque soluta sapiente, fugiat eveniet. Nostrum
                ipsa ad ab. Impedit iste ullam obcaecati nulla! Mollitia
                accusamus, sint facere iusto ad recusandae quia, pariatur minus
                reprehenderit dignissimos delectus voluptate quisquam dolores
                assumenda beatae expedita ut, ducimus tempora quos. Aperiam
                consequuntur, provident sed alias harum voluptas odio minus, ad
                modi unde recusandae repellat quaerat praesentium veritatis! At
                animi quisquam iusto necessitatibus, nam optio quos, officiis
                labore illo suscipit rerum mollitia consequatur aut asperiores.
                Minima adipisci repudiandae quod voluptatum eos error quas,
                nihil itaque quaerat ipsum fugit, non nostrum. Labore
                consequatur quidem ullam aut incidunt minus ipsa voluptate,
                exercitationem blanditiis, laboriosam deleniti neque non. Cumque
                iusto sint tempore excepturi, enim vitae modi, laboriosam maxime
                impedit iste fuga, cupiditate nesciunt vero asperiores
                architecto natus deserunt perspiciatis eos ducimus? Distinctio
                ratione accusamus nobis obcaecati quaerat beatae quae? Quis
                voluptate facilis laudantium, eaque quam, eligendi praesentium
                et velit debitis tempora consequuntur accusantium harum suscipit
                natus explicabo sit atque aliquam laborum quia quaerat. Eum
                facere enim mollitia quo similique ex explicabo laboriosam
                commodi id aspernatur, esse sequi quam, libero ipsam maxime!
                Autem amet, neque odio accusantium minus fuga id repudiandae
                nihil minima excepturi ea blanditiis tempore illo adipisci culpa
                dolore eius qui eum, aspernatur fugiat? Tempore adipisci est
                doloribus saepe similique, facere assumenda, mollitia dolor
                officia illo temporibus? Molestiae maxime vel sit et! Architecto
                magnam corporis, eaque, maiores alias ad commodi accusantium
                repellat qui sit eligendi vel exercitationem nam, repudiandae
                ducimus molestias itaque dignissimos! Voluptatibus, magnam sint
                nemo nulla expedita quo minus assumenda!
              </p>
            </section>
            <section aria-label="credits" id="credits" ref={refs.credits}>
              <h2>Credits</h2>
              <ul>
                <li>
                  <a
                    href="https://www.freepik.com/free-vector/green-fluid-background-frame_16324335.htm#page=2&query=green%20background&position=0&from_view=keyword&track=ais"
                    target="_blank"
                  >
                    Image by rawpixel.com
                  </a>{" "}
                  on Freepik
                </li>
                <li>
                  <a
                    href="https://www.freepik.com/free-vector/sign-up-concept-illustration_20602852.htm#query=sign%20up&position=13&from_view=keyword&track=ais"
                    target="_blank"
                  >
                    Image by storyset
                  </a>{" "}
                  on Freepik
                </li>
              </ul>
            </section>
          </main>
        </section>

        <aside className="policy-page__toc">
          <nav aria-label="policy nav">
            <NavLink className="policy-page__navlink" replace to="#termsOfUse">
              Terms of Use
            </NavLink>
            <NavLink
              to="#safetyAndSecurity"
              className="policy-page__navlink"
              replace
            >
              Safety and Security
            </NavLink>
            <NavLink className="policy-page__navlink" replace to="#dataPrivacy">
              Data Privacy
            </NavLink>
            <NavLink className="policy-page__navlink" replace to="#credits">
              Credits
            </NavLink>
          </nav>
          <div className="policy-page__nav-placeholder"></div>
        </aside>
      </div>
    </div>
  );
};

export default PolicyPage;
