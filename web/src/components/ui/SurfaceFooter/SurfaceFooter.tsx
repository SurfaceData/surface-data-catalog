import { Trans } from 'react-i18next'
import { FaDiscord } from 'react-icons/fa';
import { ImBlog, ImGithub, ImTwitter } from 'react-icons/im';
import { Footer } from 'rsuite'
import styled from 'styled-components'

const StyledFooter = styled(Footer)`
  align-items: center;
  border-top: 1px solid #ccc;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  padding: 8px;
`

const License = styled.div`
  width: 400px;
`

const SocialIconContainer = styled.div`
  display: flex;
  gap: 10px;
`

const SocialIcon = styled.a`
  align-items: center;
  border: 1px solid rgb(220, 222, 224);
  border-radius: 50%;
  color: rgb(118, 119, 122);
  display: flex;
  height: 36px;
  justify-content: center;
  opacity: 1;
  text-decoration: none;
  width: 36px;
`

const SurfaceFooter = () => {
  return (
    <StyledFooter>
      <License>
        <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
          <img
            alt={
              <Trans i18nKey="layouts.footerLicenseAlt">
                Creative Commons License
              </Trans>
            }
            height={31}
            width={88}
            src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png"
          />
        </a>
        <br />
        <Trans i18nKey="layouts.footerLicense">
          This work is licensed under a{' '}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-nc/4.0/"
          >
            Creative Commons Attribution-NonCommercial 4.0 International License
          </a>
          .
        </Trans>
      </License>

      <div>
        <a target="_blank" rel="noreferrer" href="https://zebrasunite.coop/">
          <img
            alt={
              <Trans i18nkey="layouts.footerZebraAlt">
                Zebra's Unite Member
              </Trans>
            }
            height={45}
            width={90}
            src="/svg/ZebrasCoOp-Member-RGB-FullColor.svg"
          />
        </a>
      </div>

      <SocialIconContainer>
        <SocialIcon target="_blank" href="https://blog.surfacedata.org/">
          <ImBlog size={16} />
        </SocialIcon>

        <SocialIcon target="_blank" href="https://github.com/SurfaceData/">
          <ImGithub size={16} />
        </SocialIcon>

        <SocialIcon target="_blank" href="https://twitter.com/SurfaceData">
          <ImTwitter size={16} />
        </SocialIcon>
      </SocialIconContainer>
    </StyledFooter>
  )
}

export default SurfaceFooter
