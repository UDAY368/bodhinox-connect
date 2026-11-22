import Link from "next/link";
import {
  CopySection,
  HeroScreen,
  HighlightRow,
  Highlights,
  PhoneVisual,
  PillarPage,
  ScreenVisual,
} from "@/components/features/PillarPage";
import { InboxScreen } from "@/components/product/screens/InboxScreen";
import { CommentToDmCard, InstagramDmPhone, InstagramScreen } from "@/components/product/screens/InstagramScreen";
import { getFeature } from "@/content/features";
import type { Faq } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

const feature = getFeature("instagram");

export const metadata = pageMetadata({
  title: feature.seoTitle,
  description: feature.metaDescription,
  path: feature.href,
});

const linkClass = "text-primary underline underline-offset-4 hover:text-primary-hover";

const faqs: Faq[] = [
  {
    question: "How does comment-to-DM automation work?",
    answer:
      "Pick a post or reel, or all of them, and a keyword such as PRICE or LINK. When someone comments that keyword, Bodhinox Connect sends them a direct message with your text and a link button. You can also reply to the comment publicly so others know to check their DMs.",
  },
  {
    question: "Can I ask people to follow before they get the link?",
    answer:
      "Yes. The grow-followers option asks the person to follow your account first, then sends the reward, such as a discount code, a guide or a product link, once they have followed.",
  },
  {
    question: "Which Instagram account do I need?",
    answer:
      "An Instagram professional account (business or creator) connected to a Facebook Page. You connect it from the Channels settings in Bodhinox Connect using Meta's official login.",
  },
  {
    question: "Do Instagram DMs show up with my WhatsApp chats?",
    answer:
      "Yes. Instagram DMs arrive in the same shared inbox as WhatsApp, with a channel chip on each chat. Your team assigns, notes and replies the same way on both channels, and KHAGA AI agents can answer DMs too.",
  },
  {
    question: "Is this allowed by Instagram?",
    answer:
      "Yes. Bodhinox Connect uses Meta's official Instagram messaging API. Automated messages are sent only to people who commented, replied to a story, mentioned you or messaged you first, which is how the platform intends DM automation to work.",
  },
];

export default function Page() {
  return (
    <PillarPage
      feature={feature}
      h1="Instagram DM automation that turns comments into customers"
      lead="Send a link to everyone who comments a keyword, grow followers from your reels, capture leads from story replies, and answer every Instagram DM in the same inbox as WhatsApp."
      heroVisual={
        <HeroScreen label="Instagram tools: start-here cards for auto-DM links from comments, growing followers and leads from story replies, the last 7 days of DMs sent and new followers, and a comment-to-DM example.">
          <InstagramScreen height={800} />
        </HeroScreen>
      }
      bulletsHeading="Everything in Instagram automation"
      faqs={faqs}
      related={["team-inbox", "automation", "ai-agent"]}
    >
      <Highlights label="Instagram automation highlights">
        <HighlightRow
          id="hl-comment"
          eyebrow="Comment to DM"
          heading="Comment PRICE, get the link in seconds"
          visual={
            <ScreenVisual
              designWidth={620}
              label="A comment with the keyword PRICE on a reel, and the direct message sent automatically in reply with a link."
            >
              <CommentToDmCard />
            </ScreenVisual>
          }
        >
          <p>
            Tell people to comment a word on your post or reel. Everyone who does gets a DM with your link, and you can
            reply to the comment publicly too. No more typing the same link three hundred times after a reel takes off.
          </p>
        </HighlightRow>
        <HighlightRow
          flip
          id="hl-dm"
          eyebrow="Followers and leads"
          heading="Grow followers and collect leads from the same DM"
          visual={
            <PhoneVisual label="An Instagram DM sent automatically after a reel comment, with a follow prompt, a link button and a request for an email address.">
              <InstagramDmPhone />
            </PhoneVisual>
          }
        >
          <p>
            Ask people to follow before you send the reward, collect an email or phone number in the chat, and turn story
            replies and mentions into leads with their answers saved on the contact.
          </p>
        </HighlightRow>
        <HighlightRow
          id="hl-inbox"
          eyebrow="One inbox"
          heading="Instagram DMs next to your WhatsApp chats"
          visual={
            <ScreenVisual
              designWidth={1280}
              label="The shared inbox with channel chips for all chats, WhatsApp and Instagram, and an open conversation."
            >
              <InboxScreen height={720} withPanel={false} />
            </ScreenVisual>
          }
        >
          <p>
            When a DM needs a person, it lands in the shared inbox with the rest of your chats. The team assigns it, adds
            notes and replies without switching apps.
          </p>
        </HighlightRow>
      </Highlights>

      <CopySection id="problem" eyebrow="The problem" heading="A reel takes off and the DMs pile up">
        <p>
          Instagram is where many Indian brands are discovered. A reel does well, hundreds of people comment asking for
          the price or the link, and someone on the team spends the evening replying one by one. By the time they reach
          the last comment, most of those people have scrolled on.
        </p>
        <p>
          Story replies and mentions get the same treatment. They are warm leads, people who already like what you
          posted, but they sit in a phone that only one person checks. Nobody records who asked what, so the follow-up
          never happens.
        </p>
        <p>
          Instagram DM automation answers every comment and story reply in seconds, collects the details you need, and
          hands the conversation to your team when it is ready for a person.
        </p>
      </CopySection>

      <CopySection id="how-it-works" eyebrow="How it works" heading="From comment to conversation to sale" tone="sunken">
        <h3>Auto-DM links from comments</h3>
        <p>
          Choose a post or reel, or every post, and the keywords to watch for. When someone comments, they get a DM with
          your message and a link button, and you can reply to the comment publicly as well. Use it for price requests,
          product links, free guides and giveaways.
        </p>
        <h3>Grow followers from comments</h3>
        <p>
          Ask people to follow your account before they get the reward. Followers who came for one reel see your next
          post too.
        </p>
        <h3>Leads from story replies and mentions</h3>
        <p>
          When someone replies to your story or mentions you in theirs, send them an automatic DM, ask a question or two,
          and save the answers to their contact. Story replies become leads you can follow up.
        </p>
        <h3>Basics that cover the first message</h3>
        <p>
          Set conversation starters, a main menu and a default reply, so a new DM always gets a useful answer. Ref links
          open a DM with a specific automation, which is handy in your bio, on a poster or in an ad.
        </p>
        <h3>AI replies and sequences</h3>
        <p>
          AI can reply to comments in your tone, and{" "}
          <Link href="/features/ai-agent" className={linkClass}>
            KHAGA AI agents
          </Link>{" "}
          can answer DMs from your own knowledge. Instagram sequences follow up over the next days, and results for the
          last 7 days show DMs sent and new followers.
        </p>
      </CopySection>

      <CopySection id="who-its-for" eyebrow="Who it is for" heading="For brands that sell where they post">
        <p>
          Instagram automation suits D2C brands, creators with products, salons, cafes, coaches and anyone whose reels
          bring in more questions than the team can answer. A skincare brand sends the product link to everyone who
          comments on a routine reel. A coach sends a free class link and collects phone numbers. A boutique turns story
          replies about a new drop into orders.
        </p>
        <p>
          Because the conversations land in the same workspace as WhatsApp, a lead that starts on Instagram can continue
          on WhatsApp, buy from your{" "}
          <Link href="/features/commerce" className={linkClass}>
            online store
          </Link>{" "}
          and show up in the same contact record.
        </p>
      </CopySection>
    </PillarPage>
  );
}
