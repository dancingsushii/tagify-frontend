import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import logo from '../assets/TU-Berlin-Logo-Gray.svg';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      width: "100%",
    },
    line: {
      display: "flex",
      justifyContent: "center",
      marginTop: 10,
    },
    graytext: {
      color: "gray",
    },
    text: {
      width: "90%",
      [_theme.breakpoints.up("md")]: {
        width: "75%",
      },
      color: "gray",
    },
    centered: {
      textAlign: "center",
    },
  })
);

export const ImpressumToggle = (handleImpressum) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.line}>
        <img src={logo} width="52" height="38" />
      </div>
      <div className={classes.line}>
        <a href="#" className={classes.graytext} onClick={handleImpressum}>
          Impressum
        </a>
      </div>
    </div>
  );
};

export const Impressum = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.line}>
        <div className={classes.text}>
          <div className={classes.centered}>
            <h1>Impressum</h1>
            <hr style={{ color: "Gainsboro" }} />
            <p>
              Jacek Kmiecik, Tetiana Yakovenko, Jacob Bachmann, Witold
              Jermakowicz, <br />
              Mariusz Trzeciakiewicz, Que Le, Karol Rogoza, Luis Hebendanz
            </p>
            <img src={logo} width="52" height="38" />
            <p>
              Straße des 17. Juni 135
              <br />
              10623 Berlin
            </p>
            <hr style={{ color: "Gainsboro" }} />
            <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
          </div>
          <h3>Haftung f&uuml;r Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG
            f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen
            Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder
            gespeicherte fremde Informationen zu &uuml;berwachen oder nach
            Umst&auml;nden zu forschen, die auf eine rechtswidrige
            T&auml;tigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab
            dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
            m&ouml;glich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
            diesen Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes
            bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors
            bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r
            den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
          <p>
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
            wurden, werden die Urheberrechte Dritter beachtet. Insbesondere
            werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
            trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten
            wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
            Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
          <h3>Datenschutz</h3>
          <p>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe
            personenbezogener Daten möglich. Soweit auf unseren Seiten
            personenbezogene Daten (beispielsweise Name, Anschrift oder
            E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
            auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
            Zustimmung nicht an Dritte weitergegeben.
          </p>
          <p>
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B.
            bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann.
            Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
            nicht möglich.
          </p>
          <p>
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
            Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
            angeforderter Werbung und Informationsmaterialien wird hiermit
            ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
            ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
            von Werbeinformationen, etwa durch Spam-Mails, vor.
          </p>
          <div>
            Icons erstellt von{" "}
            <a
              href="https://www.flaticon.com/de/autoren/metropolicons"
              title="Metropolicons"
            >
              Metropolicons
            </a>{" "}
            from{" "}
            <a href="https://www.flaticon.com/de/" title="Flaticon">
              www.flaticon.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
