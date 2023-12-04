import { ArrowPathIcon, CloudArrowUpIcon, FingerPrintIcon, LockClosedIcon, BookOpenIcon, PlayIcon, HandRaisedIcon, UserGroupIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Extracurricular Activities and Clubs',
    description:
      'Explore excellence in education with our innovative programs, nurturing curiosity and a passion for learning.',
    icon: PlayIcon,
  },
  {
    name: 'Enriching Extracurriculars',
    description:
      'Beyond the classroom, discover a world of possibilities through diverse clubs and activities, fostering personal growth and teamwork.',
    icon: BookOpenIcon,
  },
  {
    name: 'Student Support Services',
    description:
      "We prioritize every student's success with dedicated counseling, tutoring, and resources, ensuring a supportive and inclusive environment.",
    icon: HandRaisedIcon,
  },
  {
    name: 'Community Engagement',
    description:
      'Join us in making a difference. Our school actively engages with the community through initiatives and partnerships, creating a positive impact beyond our walls.',
    icon: UserGroupIcon,
  },
]

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-pri">School Activites</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore the student activities
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-pri">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
