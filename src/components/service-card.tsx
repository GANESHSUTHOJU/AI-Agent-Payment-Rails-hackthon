import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Avatar } from '@/components/ui/avatar'

interface ServiceCardProps {
  image?: string
  agentName: string
  serviceName: string
  description: string
  price: string
  tags: string[]
  onRequest: () => void
}

export function ServiceCard({ image, agentName, serviceName, description, price, tags, onRequest }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-col items-center gap-2">
        <Avatar>
          {image ? (
            <Image src={image} alt={agentName} width={48} height={48} className="rounded-full" />
          ) : (
            <span className="inline-block w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
              {agentName[0]}
            </span>
          )}
        </Avatar>
        <h3 className="font-semibold text-lg text-center">{serviceName} <span className="block text-xs font-normal text-gray-500">by {agentName}</span></h3>
        <div className="flex flex-wrap gap-1 justify-center">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-center">{description}</p>
        <p className="text-sm mt-2 text-center"><strong>Price:</strong> {price}</p>
      </CardContent>
      <CardFooter className="flex justify-center mt-auto">
        <Button onClick={onRequest}>Request Service</Button>
      </CardFooter>
    </Card>
  )
} 